import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import { Registration } from "@/models/Registration";
import { Event } from "@/models/Event";
import mongoose from "mongoose";
import { buildPendingEmailHtml, sendMail } from "@/lib/email";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { eventId, name, phone, email, transactionId, screenshotUrl, screenshotKey } = body;

    if (!eventId || !name || !phone || !email || !transactionId || !screenshotUrl || !screenshotKey) {
      return NextResponse.json({ error: "All fields are required" }, { status: 400 });
    }

    if (!mongoose.Types.ObjectId.isValid(eventId)) {
      return NextResponse.json({ error: "Invalid event ID" }, { status: 400 });
    }

    await connectDB();

    // Check if event exists and is not past registration date
    const event = await Event.findById(eventId);
    if (!event) {
      return NextResponse.json({ error: "Event not found" }, { status: 404 });
    }

    if (new Date(event.registrationEndDate) <= new Date()) {
      return NextResponse.json({ error: "Registrations are closed for this event" }, { status: 400 });
    }

    // Create registration
    const registration = new Registration({
      eventId,
      name,
      phone,
      email,
      transactionId,
      screenshotUrl,
      screenshotKey,
      status: "pending",
    });

    await registration.save();

    // Format event date for email
    const eventDate = new Date(event.date).toLocaleDateString("en-IN", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });

    // Send pending confirmation email (non-blocking)
    const pendingHtml = buildPendingEmailHtml({
      name,
      eventTitle: event.title,
      eventDate,
      venue: event.venue,
      transactionId,
      registrationId: String(registration._id),
    });

    sendMail(
      email,
      `Registration Received (Pending Verification) — ${event.title} | Créer Club`,
      pendingHtml
    ).catch((err) => console.error("Pending email send error:", err));

    return NextResponse.json({ success: true, registrationId: registration._id }, { status: 201 });
  } catch (error: any) {
    console.error("POST /api/register error:", error);
    return NextResponse.json({ error: "Failed to submit registration" }, { status: 500 });
  }
}

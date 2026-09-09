import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import { Registration } from "@/models/Registration";
import { Event } from "@/models/Event";
import mongoose from "mongoose";

// Basic rate limiting could be added here (e.g., using Upstash Redis or a simple in-memory store)

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

    return NextResponse.json({ success: true, registrationId: registration._id }, { status: 201 });
  } catch (error: any) {
    console.error("POST /api/register error:", error);
    return NextResponse.json({ error: "Failed to submit registration" }, { status: 500 });
  }
}

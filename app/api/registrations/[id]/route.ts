import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import authOptions from "@/lib/auth";
import connectDB from "@/lib/db";
import { Registration } from "@/models/Registration";
import { Event } from "@/models/Event";
import { UTApi } from "uploadthing/server";
import {
  buildVerifiedTicketEmailHtml,
  buildRejectionEmailHtml,
  sendMail,
} from "@/lib/email";

// Ensure Event model is registered in Mongoose
void Event;

const utapi = new UTApi();

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { id } = await params;
    const body = await req.json();
    const { action, rejectionReason } = body;

    if (!["approve", "reject"].includes(action)) {
      return NextResponse.json({ error: "Invalid action" }, { status: 400 });
    }

    await connectDB();

    // Populate event so we can include details in the email
    const registration = await Registration.findById(id).populate<{
      eventId: { title: string; date: Date; venue: string };
    }>("eventId", "title date venue");

    if (!registration) {
      return NextResponse.json({ error: "Registration not found" }, { status: 404 });
    }

    const event = registration.eventId as { title: string; date: Date; venue: string } | undefined;
    const eventTitle = event?.title ?? "Créer Club Workshop";
    const eventDate = event?.date
      ? new Date(event.date).toLocaleDateString("en-IN", {
          weekday: "long",
          year: "numeric",
          month: "long",
          day: "numeric",
        })
      : "Upcoming Date";
    const venue = event?.venue ?? "Venue details will be shared";

    if (action === "approve") {
      // Delete screenshot from UploadThing after approval
      if (registration.screenshotKey) {
        await utapi.deleteFiles(registration.screenshotKey);
      }

      registration.status = "verified";
      registration.screenshotUrl = undefined as any;
      registration.screenshotKey = undefined as any;
      await registration.save();

      // Send Payment Verified Ticket Email (non-blocking)
      const ticketHtml = buildVerifiedTicketEmailHtml({
        name: registration.name,
        eventTitle,
        eventDate,
        venue,
        registrationId: String(registration._id),
        transactionId: registration.transactionId,
      });

      sendMail(
        registration.email,
        `Payment Verified — You're In! 🎟️ | ${eventTitle}`,
        ticketHtml
      ).catch((err) => console.error("Ticket email send error:", err));
    } else {
      registration.status = "rejected";
      registration.rejectionReason = rejectionReason || null;
      await registration.save();

      // Send rejection email (non-blocking)
      const rejectionHtml = buildRejectionEmailHtml({
        name: registration.name,
        eventTitle,
        reason: rejectionReason,
      });

      sendMail(
        registration.email,
        `Registration Update — ${eventTitle} | Créer Club`,
        rejectionHtml
      ).catch((err) => console.error("Rejection email send error:", err));
    }

    return NextResponse.json({ success: true, status: registration.status });
  } catch (error) {
    console.error("PATCH /api/registrations/[id] error:", error);
    return NextResponse.json({ error: "Failed to update registration" }, { status: 500 });
  }
}

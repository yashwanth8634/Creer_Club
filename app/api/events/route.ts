import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import { Event } from "@/models/Event";
import { DateTime } from "luxon";

export async function GET() {
  try {
    await connectDB();
    const currentDate = DateTime.now().setZone("Asia/Kolkata").toISO();

    // Automatically consider events where registrationEndDate has passed as "past"
    // So we fetch events where registrationEndDate > currentDate
    // Alternatively, we just fetch all events but order them by newest created.
    // Let's fetch all upcoming events for the homepage.
    const events = await Event.find({
      registrationEndDate: { $gt: currentDate }
    }).sort({ createdAt: -1 }).lean();
    
    return NextResponse.json(events);
  } catch (error) {
    console.error("GET /api/events error:", error);
    return NextResponse.json({ error: "Failed to fetch events" }, { status: 500 });
  }
}

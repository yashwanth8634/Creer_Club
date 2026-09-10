import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import authOptions from "@/lib/auth";
import connectDB from "@/lib/db";
import { Registration } from "@/models/Registration";
import { Event } from "@/models/Event";

// Ensure Event model is loaded into mongoose
void Event;

export async function GET(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    await connectDB();
    const { searchParams } = new URL(req.url);
    const eventId = searchParams.get("eventId");
    const status = searchParams.get("status");

    const filter: Record<string, unknown> = {};
    if (eventId) filter.eventId = eventId;
    if (status) filter.status = status;

    const registrations = await Registration.find(filter)
      .populate("eventId", "title date")
      .sort({ createdAt: -1 })
      .lean();

    return NextResponse.json(registrations);
  } catch (error) {
    console.error("GET /api/registrations error:", error);
    const message = error instanceof Error ? error.message : "Failed to fetch registrations";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

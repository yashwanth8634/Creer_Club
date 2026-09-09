import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import authOptions from "@/lib/auth";
import connectDB from "@/lib/db";
import { Event } from "@/models/Event";

// Admin-only route: fetch ALL events (including past) for management
export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    await connectDB();
    const events = await Event.find({}).sort({ createdAt: -1 }).lean();
    return NextResponse.json(events);
  } catch (error) {
    console.error("GET /api/admin/events error:", error);
    return NextResponse.json({ error: "Failed to fetch events" }, { status: 500 });
  }
}

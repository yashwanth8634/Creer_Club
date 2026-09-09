import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import authOptions from "@/lib/auth";
import connectDB from "@/lib/db";
import { Event } from "@/models/Event";

export async function GET() {
  try {
    await connectDB();
    const currentDate = new Date();
    
    const events = await Event.find({
      registrationEndDate: { $gt: currentDate }
    }).sort({ createdAt: -1 }).lean();
    
    return NextResponse.json(events);
  } catch (error) {
    console.error("GET /api/events error:", error);
    return NextResponse.json({ error: "Failed to fetch events" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await req.json();
    const { title, description, date, registrationEndDate, venue, fee, coverImage } = body;

    if (!title || !description || !date || !registrationEndDate || !venue || fee == null || !coverImage) {
      return NextResponse.json({ error: "All fields are required" }, { status: 400 });
    }

    await connectDB();
    const event = new Event({
      title,
      description,
      date: new Date(date),
      registrationEndDate: new Date(registrationEndDate),
      venue,
      fee: Number(fee),
      coverImage,
      galleryImages: [],
      status: new Date(date) > new Date() ? "upcoming" : "past",
    });

    await event.save();
    return NextResponse.json(event, { status: 201 });
  } catch (error) {
    console.error("POST /api/events error:", error);
    return NextResponse.json({ error: "Failed to create event" }, { status: 500 });
  }
}

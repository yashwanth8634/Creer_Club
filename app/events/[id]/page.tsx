import connectDB from "@/lib/db";
import { Event } from "@/models/Event";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import mongoose from "mongoose";
import RegistrationForm from "@/components/RegistrationForm";
import { DateTime } from "luxon";
import type { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return { title: "Workshop Not Found | Créer Club" };
  }
  await connectDB();
  const event = await Event.findById(id).lean();
  if (!event) {
    return { title: "Workshop Not Found | Créer Club" };
  }
  return {
    title: `${event.title} | Créer Club Workshop`,
    description: event.description.slice(0, 150),
  };
}

export default async function EventDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    notFound();
  }

  await connectDB();
  const event = await Event.findById(id).lean();

  if (!event) {
    notFound();
  }

  const isPast = DateTime.fromJSDate(new Date(event.registrationEndDate)) <= DateTime.now();

  return (
    <div className="py-8 sm:py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
        {/* Back Link */}
        <Link
          href="/#events"
          className="inline-flex items-center gap-2 text-sm text-foreground/70 hover:text-primary transition-colors font-medium mb-6 group cursor-pointer"
        >
          <svg className="w-4 h-4 transform group-hover:-translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          <span>Back to All Workshops</span>
        </Link>

        {/* Main Card */}
        <div className="bg-white rounded-2xl overflow-hidden shadow-xs border border-accent/60 flex flex-col lg:flex-row">
          {/* Cover Image Col */}
          <div className="lg:w-1/2 relative min-h-[280px] sm:min-h-[360px] lg:min-h-full bg-accent/20">
            {event.coverImage ? (
              <Image
                src={event.coverImage}
                alt={event.title}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            ) : (
              <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center bg-gradient-to-br from-accent/30 to-accent/10">
                <span className="text-3xl font-serif font-bold italic text-primary/40 mb-2">Créer Club</span>
                <span className="text-xs text-foreground/40 font-medium">Art Workshop</span>
              </div>
            )}
            <div className="absolute top-4 left-4 z-10">
              {isPast ? (
                <span className="inline-block bg-black/70 backdrop-blur-md text-white px-3.5 py-1 rounded-full text-xs font-semibold tracking-wide">
                  REGISTRATIONS CLOSED
                </span>
              ) : (
                <span className="inline-block bg-secondary text-foreground px-3.5 py-1 rounded-full text-xs font-bold tracking-wide shadow-xs">
                  OPEN FOR BOOKING
                </span>
              )}
            </div>
          </div>

          {/* Details Col */}
          <div className="lg:w-1/2 p-6 sm:p-10 lg:p-12 flex flex-col justify-between">
            <div>
              <h1 className="text-3xl sm:text-4xl font-serif font-bold text-primary mb-4 leading-tight">
                {event.title}
              </h1>
              <p className="text-foreground/80 text-sm sm:text-base leading-relaxed whitespace-pre-line mb-8">
                {event.description}
              </p>

              {/* Key Specs */}
              <div className="space-y-4 mb-8 bg-background/70 p-5 rounded-xl border border-accent/40">
                {/* Date & Time */}
                <div className="flex items-start gap-3.5">
                  <div className="p-2 rounded-lg bg-primary/10 text-primary shrink-0">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-xs text-foreground/60 font-medium uppercase tracking-wider">Date & Time</p>
                    <p className="text-sm sm:text-base font-semibold text-foreground">
                      {DateTime.fromJSDate(new Date(event.date)).toFormat("cccc, LLLL d, yyyy 'at' h:mm a")}
                    </p>
                  </div>
                </div>

                {/* Venue */}
                <div className="flex items-start gap-3.5">
                  <div className="p-2 rounded-lg bg-primary/10 text-primary shrink-0">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-xs text-foreground/60 font-medium uppercase tracking-wider">Venue Location</p>
                    <p className="text-sm sm:text-base font-semibold text-foreground">{event.venue}</p>
                  </div>
                </div>

                {/* Fee */}
                <div className="flex items-start gap-3.5">
                  <div className="p-2 rounded-lg bg-secondary/20 text-primary shrink-0">
                    <svg className="w-5 h-5 text-secondary-dark" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-xs text-foreground/60 font-medium uppercase tracking-wider">Workshop Fee</p>
                    <p className="text-lg font-bold text-primary">₹ {event.fee} </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Registration Area */}
            <div>
              {isPast ? (
                <div className="bg-accent/30 text-foreground/80 p-5 text-center rounded-xl border border-accent/60">
                  <p className="font-serif font-bold text-lg mb-1">Registrations are Closed</p>
                  <p className="text-xs text-foreground/60">
                    This workshop has reached capacity or the deadline has passed. Follow our Instagram to catch the next session!
                  </p>
                </div>
              ) : (
                <div className="border-t border-accent/40 pt-6">
                  <h2 className="text-xl font-serif font-bold text-primary mb-4">
                    Reserve Your Seat
                  </h2>
                  <RegistrationForm eventId={id} upiQrCode={event.upiQrCode} />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

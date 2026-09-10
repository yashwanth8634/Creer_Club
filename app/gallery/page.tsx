import connectDB from "@/lib/db";
import { Event } from "@/models/Event";
import type { Metadata } from "next";
import GalleryGrid, { EventGalleryGroup } from "@/components/GalleryGrid";
import Link from "next/link";
import { DateTime } from "luxon";

export const metadata: Metadata = {
  title: "Workshop Gallery | Créer Club",
  description: "Explore photos and artwork from each Créer Club weekend painting workshop.",
};

export const dynamic = "force-dynamic";

export default async function GalleryPage() {
  await connectDB();

  // Fetch events from the database that have gallery images uploaded
  const events = await Event.find({
    "galleryImages.0": { $exists: true },
  })
    .sort({ date: -1 })
    .lean();

  const groups: EventGalleryGroup[] = events
    .filter((ev) => ev.galleryImages && ev.galleryImages.length > 0)
    .map((ev) => ({
      _id: ev._id.toString(),
      title: ev.title,
      date: DateTime.fromJSDate(new Date(ev.date)).toFormat("cccc, LLLL d, yyyy"),
      venue: ev.venue,
      images: ev.galleryImages,
    }));

  return (
    <div className="py-12 sm:py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider bg-secondary/20 text-primary border border-secondary/30 mb-3">
            Moments & Creations
          </span>
          <h1 className="text-4xl sm:text-5xl font-serif font-bold text-primary italic mb-4">
            Workshop Gallery
          </h1>
          <p className="text-foreground/75 font-serif italic text-base sm:text-lg">
            Browse through past weekend workshops, canvas creations, and memories made by our community.
          </p>
        </div>

        {/* Gallery Grouped by Each Event */}
        <GalleryGrid groups={groups} />

        {/* Community Note */}
        {groups.length > 0 && (
          <div className="mt-16 text-center bg-accent/20 border border-accent/40 rounded-2xl p-8 max-w-xl mx-auto">
            <h3 className="font-serif font-bold text-xl text-primary mb-2">Join Our Next Canvas</h3>
            <p className="text-sm text-foreground/75 mb-6">
              Reserve your spot for upcoming weekend workshops or follow along on our social page for live updates.
            </p>
            <Link
              href="/#events"
              className="inline-block bg-primary text-background px-6 py-2.5 rounded-lg text-sm font-medium hover:bg-primary-light transition-colors shadow-xs"
            >
              Explore Upcoming Workshops
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

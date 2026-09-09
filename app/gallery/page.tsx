import connectDB from "@/lib/db";
import { Event } from "@/models/Event";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Gallery | Créer Club",
  description: "Browse photos from past Créer Club painting workshops.",
};

export const dynamic = "force-dynamic";

export default async function GalleryPage() {
  await connectDB();

  // Fetch events that have gallery images
  const events = await Event.find({
    "galleryImages.0": { $exists: true },
  })
    .sort({ date: -1 })
    .lean();

  const hasImages = events.some((ev) => ev.galleryImages.length > 0);

  return (
    <div className="container mx-auto px-4 py-16">
      <h1 className="text-5xl font-serif font-bold text-primary mb-4 italic">Gallery</h1>
      <div className="w-16 h-1 bg-secondary rounded-full mb-12"></div>

      {!hasImages ? (
        <div className="text-center py-24 bg-accent/10 rounded-2xl border border-accent/40">
          <p className="text-xl text-foreground/60 font-serif italic">No gallery photos yet.</p>
          <p className="text-sm text-foreground/40 mt-2">Check back after our next workshop!</p>
        </div>
      ) : (
        <div className="space-y-16">
          {events.map((ev) => (
            <section key={ev._id.toString()}>
              <h2 className="text-2xl font-serif font-bold text-primary mb-2">{ev.title}</h2>
              <p className="text-sm text-foreground/50 mb-6">
                {new Date(ev.date).toLocaleDateString("en-US", {
                  weekday: "long",
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                })}
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {ev.galleryImages.map((img, idx) => (
                  <div
                    key={idx}
                    className="aspect-square rounded-xl overflow-hidden border border-accent/30 shadow-sm hover:shadow-md transition-shadow group"
                  >
                    <img
                      src={img.url}
                      alt={`${ev.title} photo ${idx + 1}`}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                ))}
              </div>
            </section>
          ))}
        </div>
      )}
    </div>
  );
}

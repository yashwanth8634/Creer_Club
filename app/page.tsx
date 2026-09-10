import connectDB from "@/lib/db";
import { Event } from "@/models/Event";
import EventCard from "@/components/EventCard";
import { DateTime } from "luxon";
import HeroSection from "@/components/HeroSection";

export const dynamic = "force-dynamic";

export default async function Home() {
  await connectDB();
  const currentDate = DateTime.now().toJSDate();

  // Fetch upcoming events
  const events = await Event.find({
    registrationEndDate: { $gt: currentDate },
  })
    .sort({ createdAt: -1 })
    .lean();

  return (
    <div>
      <HeroSection />

      {/* Events Section */}
      <section id="events" className="py-20 px-4 bg-background scroll-mt-16 sm:scroll-mt-20">
        <div className="container mx-auto">
          <div className="flex items-center justify-between mb-10">
            <h2 className="text-3xl font-sans font-bold text-primary italic">Upcoming Workshops</h2>
          </div>

          {events.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {events.map((event: any) => (
                <EventCard key={event._id.toString()} event={event} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16 bg-accent/10 rounded-xl border border-accent/50">
              <p className="text-xl text-foreground/70 mb-2 font-serif">No upcoming workshops at the moment.</p>
              <p className="text-foreground/50">Follow our Instagram to get notified when new events drop!</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

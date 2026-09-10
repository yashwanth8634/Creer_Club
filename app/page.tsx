import connectDB from "@/lib/db";
import { Event } from "@/models/Event";
import EventCard from "@/components/EventCard";
import Link from "next/link";
import Image from "next/image";
import { DateTime } from "luxon";
import ScrollToEventsButton from "@/components/ScrollToEventsButton";

export const dynamic = "force-dynamic";

export default async function Home() {
  await connectDB();
  const currentDate = DateTime.now().toJSDate();
  
  // Fetch upcoming events
  const events = await Event.find({
    registrationEndDate: { $gt: currentDate }
  }).sort({ createdAt: -1 }).lean();

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-accent/30 py-16 px-4 border-b border-accent/50 relative overflow-hidden">
        <div className="container mx-auto flex flex-col lg:flex-row items-center justify-between gap-10">
          <div className="lg:w-1/2 text-center lg:text-left z-10 animate-fade-in-up">
            <h1 className="text-5xl md:text-7xl font-serif font-bold text-primary mb-1 tracking-wide leading-tighter italic">
              Créer Club
            </h1>
            <p className="text-xl md:text-2xl text-foreground/80 font-serif mb-8 max-w-lg mx-auto lg:mx-0 italic">
              A cozy place to paint, create, and connect.
            </p>
            <div className="flex gap-4 justify-center lg:justify-start">
              <ScrollToEventsButton className="bg-primary text-background px-8 py-3 rounded-xl font-medium hover:bg-primary-light hover:-translate-y-0.5 active:scale-95 transition-all duration-200 shadow-xs hover:shadow-md font-serif italic cursor-pointer">
                View Workshops
              </ScrollToEventsButton>
              <Link
                href="/about"
                className="bg-primary text-background px-8 py-3 rounded-xl font-medium hover:bg-primary-light hover:-translate-y-0.5 active:scale-95 transition-all duration-200 shadow-xs hover:shadow-md font-serif italic cursor-pointer"
              >
                Know Us
              </Link>
            </div>
          </div>
          <div className="lg:w-1/2 relative min-h-[320px] sm:min-h-[380px] md:min-h-[450px] w-full mt-8 lg:mt-0 flex justify-center items-center">
            <div className="relative w-full max-w-xs sm:max-w-sm md:max-w-md aspect-square">
              <Image
                src="/1.png"
                alt="Créer Club workshop artwork 1"
                width={400}
                height={400}
                priority
                sizes="(max-width: 768px) 60vw, 260px"
                className="absolute top-0 left-0 w-3/5 rounded-2xl shadow-xl transform -rotate-6 z-10 hover:rotate-0 hover:scale-105 hover:z-40 transition-all duration-500 ease-out border-4 border-white object-cover aspect-square animate-float cursor-pointer"
              />
              <Image
                src="/2.png"
                alt="Créer Club workshop artwork 2"
                width={400}
                height={400}
                sizes="(max-width: 768px) 60vw, 260px"
                className="absolute top-1/4 right-0 w-3/5 rounded-2xl shadow-xl transform rotate-3 z-20 hover:rotate-0 hover:scale-105 hover:z-40 transition-all duration-500 ease-out border-4 border-white object-cover aspect-square animate-float-delayed cursor-pointer"
              />
              <Image
                src="/3.png"
                alt="Créer Club workshop artwork 3"
                width={400}
                height={400}
                sizes="(max-width: 768px) 60vw, 260px"
                className="absolute bottom-0 left-1/4 w-3/5 rounded-2xl shadow-xl transform -rotate-2 z-30 hover:rotate-0 hover:scale-105 hover:z-40 transition-all duration-500 ease-out border-4 border-white object-cover aspect-square animate-float cursor-pointer"
              />
            </div>
          </div>
        </div>
      </section>

      {/* About Preview */}
      {/* <section className="py-16 px-4 max-w-4xl mx-auto text-center">
        <h2 className="text-3xl font-serif font-bold text-primary mb-6">Welcome to our Club</h2>
        <p className="text-lg text-foreground/80 mb-8 leading-relaxed">
          We host weekend workshops where you can unwind with a canvas, good company, and great aesthetics. Whether you're a seasoned artist or holding a brush for the first time, there's a spot for you here.
        </p>
        <Link href="/about" className="inline-block border border-primary text-primary px-8 py-3 font-medium hover:bg-primary hover:text-background transition-colors rounded-sm">
          Read Our Story
        </Link>
      </section> */}

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

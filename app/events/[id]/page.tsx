import connectDB from "@/lib/db";
import { Event } from "@/models/Event";
import { notFound } from "next/navigation";
import Link from "next/link";
import mongoose from "mongoose";
import RegistrationForm from "@/components/RegistrationForm";
import { DateTime } from "luxon";

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
    <div className="container mx-auto px-4 py-12">
      <Link href="/" className="inline-block mb-6 text-primary hover:underline font-medium">
        &larr; Back to Events
      </Link>
      
      <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-accent flex flex-col md:flex-row">
        <div className="md:w-1/2 relative min-h-[300px] md:min-h-full bg-accent/20">
          {event.coverImage ? (
            <img 
              src={event.coverImage} 
              alt={event.title} 
              className="absolute inset-0 w-full h-full object-cover" 
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center text-primary/30 font-serif text-3xl">
              Créer Club
            </div>
          )}
        </div>
        
        <div className="md:w-1/2 p-8 md:p-12 flex flex-col">
          <div className="mb-6">
            {isPast ? (
              <span className="inline-block bg-accent text-foreground/70 px-3 py-1 rounded-full text-xs font-bold mb-4">
                REGISTRATIONS CLOSED
              </span>
            ) : (
              <span className="inline-block bg-primary/10 text-primary px-3 py-1 rounded-full text-xs font-bold mb-4">
                UPCOMING
              </span>
            )}
            <h1 className="text-3xl md:text-4xl font-serif font-bold text-primary mb-4">
              {event.title}
            </h1>
            <p className="text-foreground/80 leading-relaxed whitespace-pre-line">
              {event.description}
            </p>
          </div>
          
          <div className="space-y-4 mb-10 text-foreground">
            <div className="flex items-start gap-3">
              <span className="w-5 h-5 mt-0.5 inline-block bg-secondary rounded-full shrink-0"></span>
              <div>
                <p className="font-semibold">Date & Time</p>
                <p className="text-foreground/80">
                  {DateTime.fromJSDate(new Date(event.date)).toFormat("cccc, LLLL d 'at' h:mm a")}
                </p>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <span className="w-5 h-5 mt-0.5 inline-block bg-primary/50 rounded-sm shrink-0"></span>
              <div>
                <p className="font-semibold">Venue</p>
                <p className="text-foreground/80">{event.venue}</p>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <span className="w-5 h-5 mt-0.5 inline-block border-2 border-primary rounded-sm shrink-0"></span>
              <div>
                <p className="font-semibold">Registration Fee</p>
                <p className="text-foreground/80 font-medium">₹ {event.fee}</p>
              </div>
            </div>
          </div>
          
          <div className="mt-auto">
            {isPast ? (
              <div className="bg-accent/30 text-foreground/70 p-4 text-center rounded-sm border border-accent">
                Registrations for this event are now closed.
              </div>
            ) : (
              <div className="bg-background border-t border-accent pt-6 mt-6">
                <h3 className="text-xl font-serif font-bold text-primary mb-4">Register Now</h3>
                <RegistrationForm eventId={id} />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

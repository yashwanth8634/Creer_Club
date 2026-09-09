import Link from "next/link";
import { DateTime } from "luxon";

export default function EventCard({ event }: { event: any }) {
  const isPast = DateTime.fromJSDate(new Date(event.registrationEndDate)) <= DateTime.now();
  
  return (
    <div className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow border border-accent flex flex-col h-full">
      <div className="relative h-48 w-full bg-accent/20">
        {event.coverImage ? (
          <img src={event.coverImage} alt={event.title} className="object-cover w-full h-full" />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-primary/30 font-serif text-xl">
            Créer Club
          </div>
        )}
        {isPast && (
          <div className="absolute top-2 right-2 bg-foreground/80 text-background px-3 py-1 text-xs font-semibold backdrop-blur-sm">
            Registrations Closed
          </div>
        )}
      </div>
      <div className="p-5 flex flex-col flex-grow">
        <h3 className="text-xl font-serif font-bold text-primary mb-2 line-clamp-1">{event.title}</h3>
        <p className="text-sm text-foreground/80 mb-4 line-clamp-2">{event.description}</p>
        
        <div className="mt-auto space-y-2 text-sm text-foreground/70 mb-5">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 inline-block bg-secondary rounded-full"></span>
            <span>{DateTime.fromJSDate(new Date(event.date)).toFormat("ccc, LLL d, h:mm a")}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 inline-block bg-primary/50 rounded-sm"></span>
            <span className="line-clamp-1">{event.venue}</span>
          </div>
          <div className="flex items-center gap-2 font-medium text-primary">
            <span>₹ {event.fee}</span>
          </div>
        </div>
        
        <Link 
          href={`/events/${event._id}`}
          className={`w-full py-2.5 rounded-sm text-center font-medium transition-colors ${
            isPast 
              ? "bg-accent text-foreground/50 pointer-events-none" 
              : "bg-primary text-background hover:bg-primary-light shadow-sm"
          }`}
          aria-disabled={isPast}
        >
          {isPast ? "Closed" : "View Details & Register"}
        </Link>
      </div>
    </div>
  );
}

import Link from "next/link";
import Image from "next/image";
import { DateTime } from "luxon";

interface EventCardProps {
  event: {
    _id: string | { toString: () => string };
    title: string;
    description: string;
    date: string | Date;
    registrationEndDate: string | Date;
    venue: string;
    fee: number;
    coverImage?: string;
  };
}

export default function EventCard({ event }: EventCardProps) {
  const eventId = typeof event._id === "string" ? event._id : event._id.toString();
  const isPast = DateTime.fromJSDate(new Date(event.registrationEndDate)) <= DateTime.now();

  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-xs hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 ease-out border border-accent/60 flex flex-col h-full group">
      {/* Cover Image */}
      <div className="relative h-52 w-full bg-accent/20 overflow-hidden">
        {event.coverImage ? (
          <Image
            src={event.coverImage}
            alt={event.title}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover group-hover:scale-106 transition-transform duration-700 ease-out"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-primary/30 font-serif text-2xl italic">
            Créer Club
          </div>
        )}
        <div className="absolute top-3 right-3 z-10">
          {isPast ? (
            <span className="bg-black/75 backdrop-blur-xs text-white px-3 py-1 rounded-full text-xs font-semibold">
              Registrations Closed
            </span>
          ) : (
            <span className="bg-secondary text-foreground px-3 py-1 rounded-full text-xs font-bold shadow-xs">
              Open
            </span>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="p-6 flex flex-col flex-grow">
        <h3 className="text-xl font-serif font-bold text-primary mb-2 group-hover:text-primary-light transition-colors duration-200 line-clamp-1">
          {event.title}
        </h3>
        <p className="text-sm text-foreground/75 mb-6 line-clamp-2 leading-relaxed">
          {event.description}
        </p>

        {/* Event Details with SVG Icons */}
        <div className="mt-auto space-y-2.5 text-xs sm:text-sm text-foreground/75 mb-6 border-t border-accent/40 pt-4">
          <div className="flex items-center gap-2.5 group-hover:translate-x-0.5 transition-transform duration-300">
            <svg className="w-4 h-4 text-primary shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <span className="font-medium">
              {DateTime.fromJSDate(new Date(event.date)).toFormat("ccc, LLL d, h:mm a")}
            </span>
          </div>

          <div className="flex items-center gap-2.5 group-hover:translate-x-0.5 transition-transform duration-300">
            <svg className="w-4 h-4 text-primary shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <span className="line-clamp-1">{event.venue}</span>
          </div>

          <div className="flex items-center gap-2.5 font-bold text-primary text-base">
            <span>₹ {event.fee}</span>
          </div>
        </div>

        {/* CTA */}
        <Link
          href={`/events/${eventId}`}
          className={`w-full py-2.5 rounded-xl text-center text-sm font-medium transition-all duration-200 shadow-xs active:scale-98 ${
            isPast
              ? "bg-accent/60 text-foreground/50 pointer-events-none cursor-default"
              : "bg-primary text-background hover:bg-primary-light hover:shadow-md cursor-pointer"
          }`}
          aria-disabled={isPast}
        >
          {isPast ? "Registrations Closed" : "View Details & Register"}
        </Link>
      </div>
    </div>
  );
}

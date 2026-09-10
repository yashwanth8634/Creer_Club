import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Users, Heart, Sparkles, ChevronDown, CalendarDays } from "lucide-react";
import ScrollToEventsButton from "@/components/ScrollToEventsButton";

// ─── Botanical leaf doodles ────────────────────────────────────────────────

function BotanicalBranch1({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 70 130"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path d="M 35,125 C 35,90 35,55 35,20" stroke="#B8916E" strokeWidth="1.3" strokeLinecap="round" />
      <path d="M 35,100 C 18,84 10,68 22,50" stroke="#B8916E" strokeWidth="1.1" strokeLinecap="round" />
      <path d="M 22,50 C 12,37 16,22 26,26" stroke="#B8916E" strokeWidth="1" strokeLinecap="round" />
      <path d="M 35,75 C 50,60 58,44 50,26" stroke="#B8916E" strokeWidth="1.1" strokeLinecap="round" />
      <path d="M 50,26 C 60,15 62,6 54,10" stroke="#B8916E" strokeWidth="1" strokeLinecap="round" />
      <path d="M 35,50 C 20,38 16,24 26,14" stroke="#B8916E" strokeWidth="1" strokeLinecap="round" />
    </svg>
  );
}

function BotanicalBranch2({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 90 70"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path d="M 5,65 C 30,48 55,28 85,8" stroke="#B8916E" strokeWidth="1.2" strokeLinecap="round" />
      <path d="M 20,55 C 14,40 20,26 34,22" stroke="#B8916E" strokeWidth="1" strokeLinecap="round" />
      <path d="M 34,22 C 28,12 32,4 40,8" stroke="#B8916E" strokeWidth="1" strokeLinecap="round" />
      <path d="M 52,38 C 44,25 48,12 60,14" stroke="#B8916E" strokeWidth="1" strokeLinecap="round" />
    </svg>
  );
}

// ─── Background watercolor blob ────────────────────────────────────────────

function WatercolorBlob() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none select-none absolute -top-8 -left-12 sm:-left-20 w-72 sm:w-96 h-56 sm:h-72 z-0"
    >
      <svg viewBox="0 0 380 280" fill="none" className="w-full h-full">
        <defs>
          <filter id="wc-blur">
            <feGaussianBlur stdDeviation="40" />
          </filter>
        </defs>
        <ellipse cx="180" cy="140" rx="160" ry="120" fill="#D4A5A5" opacity="0.22" filter="url(#wc-blur)" />
        <ellipse cx="140" cy="110" rx="110" ry="90" fill="#E8C4B8" opacity="0.18" filter="url(#wc-blur)" />
        <ellipse cx="210" cy="160" rx="90" ry="70" fill="#D4AF37" opacity="0.10" filter="url(#wc-blur)" />
      </svg>
    </div>
  );
}

// ─── Paintbrush bottom-left ────────────────────────────────────────────────

function PaintbrushDecor() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none select-none absolute bottom-0 -left-4 sm:left-0 w-44 sm:w-56 z-0"
    >
      <svg viewBox="0 0 220 55" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g transform="rotate(-7 110 27)">
          {/* Handle — wood grain look */}
          <rect x="8" y="21" width="148" height="11" rx="5.5" fill="#8B5E3C" />
          <rect x="8" y="21" width="148" height="5" rx="3" fill="#A0714A" opacity="0.5" />
          <rect x="30" y="21" width="4" height="11" fill="#7A5232" opacity="0.3" />
          <rect x="60" y="21" width="3" height="11" fill="#7A5232" opacity="0.2" />
          <rect x="100" y="21" width="3" height="11" fill="#7A5232" opacity="0.2" />
          {/* Ferrule */}
          <rect x="155" y="19" width="13" height="15" rx="1.5" fill="#9B9B9B" />
          <rect x="155" y="19" width="13" height="7" rx="1.5" fill="#B5B5B5" opacity="0.6" />
          {/* Bristles */}
          <path d="M 168,21 C 182,21.5 196,24 200,27 C 196,30 182,32.5 168,33 Z" fill="#3E2723" />
          <path d="M 168,23 C 178,23.5 192,25.5 197,27 C 193,28.5 180,30 168,30 Z" fill="#5D3A1A" opacity="0.4" />
          {/* Paint on tip */}
          <path d="M 192,24 C 198,25 201,26.5 201,27 C 201,27.5 198,29 192,30 Z" fill="#800000" />
        </g>
      </svg>
    </div>
  );
}

// ─── Plant leaves bottom-right ────────────────────────────────────────────

function PlantDecor() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none select-none absolute bottom-0 -right-4 sm:right-0 w-20 sm:w-28 z-0"
    >
      <svg viewBox="0 0 110 140" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Stem */}
        <path d="M 55,138 C 55,105 55,72 55,40" stroke="#4A7A4A" strokeWidth="2.2" strokeLinecap="round" />
        {/* Left branch 1 */}
        <path d="M 55,110 C 34,92 22,74 32,52" stroke="#4A7A4A" strokeWidth="1.6" strokeLinecap="round" />
        <ellipse cx="30" cy="56" rx="18" ry="11" fill="#5D9A5D" opacity="0.75" transform="rotate(-28 30 56)" />
        {/* Right branch 1 */}
        <path d="M 55,85 C 74,68 84,50 76,30" stroke="#4A7A4A" strokeWidth="1.6" strokeLinecap="round" />
        <ellipse cx="78" cy="34" rx="16" ry="10" fill="#5D9A5D" opacity="0.70" transform="rotate(22 78 34)" />
        {/* Left branch 2 */}
        <path d="M 55,60 C 37,46 30,30 40,16" stroke="#4A7A4A" strokeWidth="1.4" strokeLinecap="round" />
        <ellipse cx="38" cy="20" rx="14" ry="9" fill="#5D9A5D" opacity="0.65" transform="rotate(-20 38 20)" />
        {/* Right branch 2 */}
        <path d="M 55,42 C 72,30 78,14 68,5" stroke="#4A7A4A" strokeWidth="1.3" strokeLinecap="round" />
        <ellipse cx="70" cy="8" rx="12" ry="8" fill="#5D9A5D" opacity="0.60" transform="rotate(18 70 8)" />
      </svg>
    </div>
  );
}

// ─── Feature items row ─────────────────────────────────────────────────────

const FEATURES = [
  { Icon: Users, label: "Creative\nWorkshops" },
  { Icon: Heart, label: "A Supportive\nCommunity" },
  { Icon: Sparkles, label: "A Happier\nYou" },
];

// ─── Hero Section ─────────────────────────────────────────────────────────

export default function HeroSection() {
  return (
    <section className="relative bg-[#FAF7F2] overflow-hidden">
      {/* Background art decorations (z-0) */}
      <WatercolorBlob />
      <PaintbrushDecor />
      <PlantDecor />

      {/* Main layout */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center lg:items-stretch gap-0 min-h-[calc(100vh-4rem)]">

          {/* ── Left Column ── */}
          <div className="w-full lg:w-[42%] flex flex-col justify-center py-14 lg:py-20 text-center lg:text-left relative z-10">
            {/* Pill tag */}
            <div className="inline-flex items-center justify-center lg:justify-start gap-1.5 text-[10px] tracking-[0.18em] uppercase text-foreground/45 font-sans mb-5">
              <span className="border border-foreground/20 rounded-full px-3 py-0.5 inline-flex items-center gap-1.5">
                Art <span className="opacity-50">•</span> Community <span className="opacity-50">•</span> Good Vibes
              </span>
            </div>

            {/* Main heading */}
            <h1 className="text-6xl sm:text-7xl md:text-8xl font-serif font-bold text-primary italic leading-[0.9] tracking-tight mb-3">
              Créer Club
            </h1>

            {/* Gold script subheading */}
            <p className="font-script text-2xl sm:text-3xl text-[#B8860B] mb-5 leading-snug">
              A cozy place to paint, create, and connect.
            </p>

            {/* Description */}
            <p className="text-sm sm:text-base text-foreground/60 mb-8 max-w-sm mx-auto lg:mx-0 leading-relaxed font-sans">
              Join our creative workshops, meet like-minded people,
              and turn simple moments into beautiful memories.
            </p>

            {/* CTA buttons */}
            <div className="flex flex-wrap items-center gap-3 justify-center lg:justify-start mb-10">
              <ScrollToEventsButton
                className="inline-flex items-center gap-2 bg-primary text-background px-6 py-2.5 rounded-full text-sm font-sans font-medium hover:bg-primary-light hover:-translate-y-0.5 active:scale-95 transition-all duration-200 shadow-md hover:shadow-lg cursor-pointer"
              >
                View Workshops <ArrowRight className="w-3.5 h-3.5" />
              </ScrollToEventsButton>
              <Link
                href="/about"
                className="inline-flex items-center gap-2 border border-primary/50 text-primary px-6 py-2.5 rounded-full text-sm font-sans font-medium hover:bg-primary/5 hover:border-primary hover:-translate-y-0.5 active:scale-95 transition-all duration-200 cursor-pointer"
              >
                Know Us
              </Link>
            </div>

            {/* Feature icons */}
            <div className="flex items-start justify-center lg:justify-start gap-6 sm:gap-8">
              {FEATURES.map(({ Icon, label }) => (
                <div key={label} className="flex flex-col items-center gap-1.5">
                  <div className="w-10 h-10 rounded-full bg-accent/50 border border-accent/70 flex items-center justify-center">
                    <Icon className="w-4 h-4 text-primary/60 stroke-[1.5]" />
                  </div>
                  <span className="text-[10px] text-foreground/50 font-sans text-center leading-tight whitespace-pre-line">
                    {label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* ── Center bridge: botanical doodles + floating handwritten labels ── */}
          <div
            aria-hidden="true"
            className="hidden lg:flex flex-col justify-center items-center relative w-[16%] z-10 py-20"
          >
            {/* "Good Art Brighter Days ♡" */}
            <div className="absolute top-[18%] left-0 -rotate-6 text-center select-none pointer-events-none">
              <p className="font-hand text-sm text-foreground/50 leading-tight">
                Good Art<br />Brighter Days<br />
                <span className="text-primary/60">♡</span>
              </p>
            </div>

            {/* Botanical branch 1 — left side */}
            <div className="absolute top-[32%] left-2 opacity-55">
              <BotanicalBranch1 className="w-14 h-28" />
            </div>

            {/* "Create" label */}
            <div className="absolute bottom-[36%] right-0 rotate-[6deg] select-none pointer-events-none">
              <p className="font-hand text-base text-foreground/45">Create</p>
            </div>

            {/* Botanical branch 2 — bottom */}
            <div className="absolute bottom-[22%] left-0 opacity-45">
              <BotanicalBranch2 className="w-14 h-10" />
            </div>
          </div>

          {/* ── Right Column: Polaroid collage ── */}
          <div className="w-full lg:w-[46%] xl:w-[48%] relative flex items-center justify-center py-10 lg:py-16 z-10 min-h-[460px] sm:min-h-[540px] lg:min-h-[600px]">

            {/* Floating sticky labels */}
            <div
              aria-hidden="true"
              className="absolute top-2 sm:top-6 -right-1 sm:right-0 md:-right-4 lg:-right-6 rotate-[5deg] text-right select-none pointer-events-none z-30"
            >
              <p className="font-hand text-sm sm:text-base text-foreground/50 leading-snug">
                Same<br />People<br />More Art{" "}
                <span className="text-primary/60">♡</span>
              </p>
            </div>

            {/* Photo collage container */}
            <div className="relative w-[320px] sm:w-[400px] md:w-[460px] lg:w-[480px] xl:w-[520px] h-[330px] sm:h-[410px] md:h-[470px] lg:h-[490px] xl:h-[530px]">

              {/* Polaroid 1 — top-left, rotated left */}
              <div className="absolute top-0 left-0 -rotate-6 z-10 bg-white p-2.5 sm:p-3 pb-8 sm:pb-11 shadow-[0_8px_30px_rgba(0,0,0,0.14)] hover:z-40 hover:rotate-0 hover:scale-105 transition-all duration-500 cursor-pointer group rounded-xs">
                <div className="relative w-36 sm:w-44 md:w-52 lg:w-56 xl:w-60 aspect-square overflow-hidden bg-accent/20">
                  <Image
                    src="/1.png"
                    alt="Créer Club workshop moment"
                    fill
                    sizes="(max-width: 640px) 144px, (max-width: 768px) 176px, (max-width: 1024px) 208px, 240px"
                    className="object-cover"
                    priority
                  />
                </div>
              </div>

              {/* Polaroid 2 — top-right, rotated right */}
              <div className="absolute top-3 sm:top-5 right-0 rotate-[7deg] z-20 bg-white p-2.5 sm:p-3 pb-8 sm:pb-11 shadow-[0_8px_30px_rgba(0,0,0,0.14)] hover:z-40 hover:rotate-0 hover:scale-105 transition-all duration-500 cursor-pointer rounded-xs">
                <div className="relative w-36 sm:w-44 md:w-52 lg:w-56 xl:w-60 aspect-square overflow-hidden bg-accent/20">
                  <Image
                    src="/2.png"
                    alt="Créer Club workshop moment"
                    fill
                    sizes="(max-width: 640px) 144px, (max-width: 768px) 176px, (max-width: 1024px) 208px, 240px"
                    className="object-cover"
                  />
                </div>
              </div>

              {/* Polaroid 3 — bottom-center, slight tilt, with caption */}
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 -rotate-2 z-30 bg-white p-2.5 sm:p-3 pb-9 sm:pb-12 shadow-[0_12px_40px_rgba(0,0,0,0.18)] hover:z-40 hover:rotate-0 hover:scale-105 transition-all duration-500 cursor-pointer rounded-xs">
                <div className="relative w-48 sm:w-56 md:w-64 lg:w-72 xl:w-80 h-32 sm:h-38 md:h-44 lg:h-48 xl:h-52 overflow-hidden bg-accent/20">
                  <Image
                    src="/3.png"
                    alt="The Workshop"
                    fill
                    sizes="(max-width: 640px) 192px, (max-width: 768px) 224px, (max-width: 1024px) 256px, 320px"
                    className="object-cover"
                  />
                </div>
                {/* Polaroid caption */}
                <p className="font-hand text-sm sm:text-base text-foreground/60 text-center mt-2 font-medium">
                  The Workshop ♡
                </p>
              </div>
            </div>

            {/* "Good Company ♡" */}
            <div
              aria-hidden="true"
              className="absolute top-[48%] -right-1 sm:right-0 md:-right-4 lg:-right-6 rotate-[3deg] text-right select-none pointer-events-none z-30"
            >
              <p className="font-hand text-sm sm:text-base text-foreground/45 leading-snug">
                Good Company{" "}
                <span className="text-primary/55">♡</span>
              </p>
            </div>

            {/* "Small Creations Big Stories ♡" */}
            <div
              aria-hidden="true"
              className="absolute bottom-4 sm:bottom-8 -right-1 sm:right-0 md:-right-4 lg:-right-6 -rotate-[4deg] text-right select-none pointer-events-none z-30"
            >
              <p className="font-hand text-xs sm:text-sm text-foreground/45 leading-snug">
                Small<br />Creations<br />Big Stories{" "}
                <span className="text-primary/55">♡</span>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll to explore */}
      <div className="hidden lg:flex flex-col items-center gap-1.5 pb-6 text-foreground/35 z-10 relative">
        <ChevronDown className="w-5 h-5 animate-bounce stroke-[1.5]" />
        <span className="text-[9px] tracking-[0.25em] uppercase font-sans">Scroll to explore</span>
      </div>
    </section>
  );
}

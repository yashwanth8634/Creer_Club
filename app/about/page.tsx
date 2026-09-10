import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";

export const metadata: Metadata = {
  title: "About Créer Club | Art Workshops & Community",
  description: "Learn about Créer Club — our story, mission, and cozy beginner-friendly art workshops.",
};

export default function AboutPage() {
  const experiences = [
    {
      title: "Canvas & Acrylic Painting",
      desc: "Guided step-by-step sessions where you master blending, layering, and texture on premium stretched canvas.",
      icon: (
        <svg className="w-6 h-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
        </svg>
      ),
    },
    {
      title: "Tote Bag Art Sessions",
      desc: "Turn organic cotton tote bags into wearable masterpieces using flexible, durable fabric paints.",
      icon: (
        <svg className="w-6 h-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
        </svg>
      ),
    },
    {
      title: "Themed Sunset & Evening Paint",
      desc: "Unwind with soothing playlists, aesthetic lighting, and curated themes inspired by nature and modern art.",
      icon: (
        <svg className="w-6 h-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
      ),
    },
    {
      title: "Handpicked Cozy Venues",
      desc: "We partner with charming cafes and artistic spaces that inspire creativity and comfortable connection.",
      icon: (
        <svg className="w-6 h-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
        </svg>
      ),
    },
  ];

  const promises = [
    { label: "100% Beginner Friendly", detail: "Zero prior painting experience needed. Our artist walks you through every stroke." },
    { label: "All Supplies Provided", detail: "Canvases, premium acrylics, brushes, palettes, aprons, and packaging are ready for you." },
    { label: "Take Your Art Home", detail: "Leave each workshop with a finished, ready-to-hang piece that you created." },
    { label: "A Warm Community", detail: "Come solo or with friends — you'll meet kindred spirits in an inviting, relaxed atmosphere." },
  ];

  return (
    <div className="py-12 sm:py-16">
      {/* Hero Header */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl text-center mb-16 sm:mb-20">
        <span className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider bg-secondary/20 text-primary border border-secondary/30 mb-4">
          The Art of Making
        </span>
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold text-primary italic tracking-tight mb-6">
          A cozy place to paint, create, and connect.
        </h1>
        <p className="text-lg sm:text-xl text-foreground/80 font-serif italic max-w-2xl mx-auto leading-relaxed">
          At Créer Club, we believe creativity is not reserved for the few. It's a mindful pause from daily life where everyone can craft something beautiful.
        </p>
      </section>

      {/* Story & Mission Grid */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl mb-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 items-stretch">
          {/* Story Card */}
          <div className="bg-white rounded-2xl p-8 sm:p-10 border border-accent/40 shadow-xs flex flex-col justify-between">
            <div>
              <span className="text-xs font-bold text-secondary tracking-wider uppercase mb-2 block">
                Chapter One
              </span>
              <h2 className="text-2xl sm:text-3xl font-serif font-bold text-primary mb-4">
                Our Story
              </h2>
              <p className="text-foreground/80 leading-relaxed mb-4">
                Créer Club was born from a simple feeling — that art shouldn't be intimidating, locked behind years of fine arts training or expensive private studios.
              </p>
              <p className="text-foreground/80 leading-relaxed">
                What began as a quiet weekend paint session between friends quickly evolved into a blooming community of weekend painters, daydreamers, and curious souls who love slow living and artistic expression.
              </p>
            </div>
            <div className="mt-8 pt-6 border-t border-accent/30 flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-serif font-bold text-sm">
                C
              </div>
              <span className="text-xs text-foreground/60 font-medium">Curated weekend workshops in your city</span>
            </div>
          </div>

          {/* Mission Card */}
          <div className="bg-accent/20 rounded-2xl p-8 sm:p-10 border border-accent/50 shadow-xs flex flex-col justify-between">
            <div>
              <span className="text-xs font-bold text-secondary tracking-wider uppercase mb-2 block">
                Our Purpose
              </span>
              <h2 className="text-2xl sm:text-3xl font-serif font-bold text-primary mb-4">
                Our Mission
              </h2>
              <p className="text-foreground/80 leading-relaxed mb-4">
                To make creative self-expression accessible, unhurried, and deeply restorative. We curate each event so that from the moment you sit down, everything you need is right in front of you.
              </p>
              <p className="text-foreground/80 leading-relaxed">
                No judgment, no grades — just great coffee, soft music, lovely textures, and the satisfaction of watching colors come together on your canvas.
              </p>
            </div>
            <div className="mt-8 pt-6 border-t border-accent/40 flex items-center gap-2">
              <div className="flex -space-x-2 overflow-hidden">
                <div className="inline-block h-8 w-8 rounded-full ring-2 ring-white overflow-hidden bg-primary/20">
                  <Image src="/1.png" alt="Painting preview 1" width={32} height={32} sizes="32px" className="object-cover w-full h-full" />
                </div>
                <div className="inline-block h-8 w-8 rounded-full ring-2 ring-white overflow-hidden bg-primary/20">
                  <Image src="/2.png" alt="Painting preview 2" width={32} height={32} sizes="32px" className="object-cover w-full h-full" />
                </div>
                <div className="inline-block h-8 w-8 rounded-full ring-2 ring-white overflow-hidden bg-primary/20">
                  <Image src="/3.png" alt="Painting preview 3" width={32} height={32} sizes="32px" className="object-cover w-full h-full" />
                </div>
              </div>
              <span className="text-xs text-foreground/70 font-medium ml-2">Over 200+ canvases completed</span>
            </div>
          </div>
        </div>
      </section>

      {/* What We Do */}
      <section className="bg-white py-16 border-y border-accent/40 mb-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
          <div className="text-center mb-12">
            <span className="text-xs font-bold text-secondary tracking-wider uppercase mb-2 block">
              Curated Workshops
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-primary italic">
              What We Create Together
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {experiences.map((item) => (
              <div
                key={item.title}
                className="p-6 rounded-xl border border-accent/40 bg-background/50 hover:bg-background transition-colors flex gap-4 items-start"
              >
                <div className="p-3 rounded-lg bg-accent/30 border border-accent/50 shrink-0">
                  {item.icon}
                </div>
                <div>
                  <h3 className="font-serif font-bold text-lg text-primary mb-1.5">{item.title}</h3>
                  <p className="text-sm text-foreground/75 leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* The Créer Promise */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl mb-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-serif font-bold text-primary italic mb-3">
            Why You'll Love It
          </h2>
          <p className="text-foreground/70 font-sans max-w-lg mx-auto text-sm">
            Everything is designed to make your creative session smooth and memorable.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {promises.map((p, idx) => (
            <div
              key={p.label}
              className="bg-white p-6 rounded-xl border border-accent/40 shadow-xs flex flex-col justify-between"
            >
              <div>
                <span className="text-2xl font-serif font-bold text-secondary mb-3 block">
                  0{idx + 1}
                </span>
                <h3 className="font-serif font-bold text-foreground mb-2 text-base">{p.label}</h3>
                <p className="text-xs text-foreground/70 leading-relaxed">{p.detail}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Banner */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
        <div className="rounded-2xl bg-gradient-to-br from-primary to-primary-dark text-background p-8 sm:p-12 text-center relative overflow-hidden shadow-lg border border-secondary/30">
          <div className="relative z-10 max-w-2xl mx-auto">
            <h2 className="text-3xl sm:text-4xl font-serif font-bold italic mb-4 text-secondary-light">
              Ready to create your own piece?
            </h2>
            <p className="text-sm sm:text-base text-secondary-light/80 mb-8 leading-relaxed">
              Explore upcoming weekend dates and reserve your easel. Spots are kept intimate to ensure everyone receives personalized guidance.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/#events"
                className="w-full sm:w-auto bg-secondary hover:bg-secondary-light text-foreground font-semibold px-8 py-3 rounded-lg text-sm transition-colors shadow-sm cursor-pointer"
              >
                Browse Workshops
              </Link>
              <a
                href="https://www.instagram.com/creer_club/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto border border-secondary-light/40 hover:bg-white/10 text-secondary-light font-medium px-8 py-3 rounded-lg text-sm transition-colors cursor-pointer"
              >
                Follow on Instagram
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

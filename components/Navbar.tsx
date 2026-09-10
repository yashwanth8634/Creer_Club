"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const navLinks = [
    { href: "/", label: "Workshops", exact: true },
    { href: "/about", label: "About", exact: false },
    { href: "/gallery", label: "Gallery", exact: false },
  ];

  const isActive = (href: string, exact: boolean) => {
    if (exact) return pathname === href;
    return pathname.startsWith(href);
  };

  return (
    <nav className="sticky top-0 z-50 w-full bg-background/95 backdrop-blur-md border-b border-accent/60 shadow-xs">
      <div className="container mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* Brand */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="relative w-9 h-9 sm:w-10 sm:h-10 rounded-full overflow-hidden border border-accent">
            <Image
              src="/favicon.png"
              alt="Créer Club Logo"
              width={40}
              height={40}
              className="object-contain"
              priority
            />
          </div>
          <span className="text-xl sm:text-2xl font-serif italic font-bold text-primary tracking-wide">
            Créer Club
          </span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden sm:flex items-center gap-8 text-sm font-medium font-serif italic">
          {navLinks.map((link) => {
            const active = isActive(link.href, link.exact);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`transition-colors py-1 relative ${
                  active
                    ? "text-primary font-bold after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-secondary"
                    : "text-foreground/80 hover:text-primary"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
          <Link
            href="/#events"
            className="bg-primary text-background px-4 py-1.5 rounded-full text-xs font-sans not-italic font-medium hover:bg-primary-light active:scale-95 transition-all duration-200 shadow-xs"
          >
            Book Seat
          </Link>
        </div>

        {/* Mobile Menu Button with morphing animation */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={isOpen}
          className="sm:hidden w-10 h-10 rounded-xl flex items-center justify-center text-foreground hover:bg-accent/20 active:scale-95 transition-all duration-200 cursor-pointer"
        >
          <div className="w-5 h-4 flex flex-col justify-between relative">
            <span
              className={`w-full h-0.5 bg-primary rounded-full transition-all duration-300 transform origin-left ${
                isOpen ? "rotate-45 translate-x-0.5 -translate-y-0.5" : ""
              }`}
            />
            <span
              className={`w-full h-0.5 bg-primary rounded-full transition-opacity duration-200 ${
                isOpen ? "opacity-0" : "opacity-100"
              }`}
            />
            <span
              className={`w-full h-0.5 bg-primary rounded-full transition-all duration-300 transform origin-left ${
                isOpen ? "-rotate-45 translate-x-0.5 translate-y-0.5" : ""
              }`}
            />
          </div>
        </button>
      </div>

      {/* Mobile Drawer with smooth height & opacity transition */}
      <div
        className={`sm:hidden grid transition-all duration-300 ease-in-out border-accent/40 bg-background/98 ${
          isOpen
            ? "grid-rows-[1fr] opacity-100 border-t shadow-lg"
            : "grid-rows-[0fr] opacity-0 border-t-0 pointer-events-none"
        }`}
      >
        <div className="overflow-hidden">
          <div className="px-4 py-5 space-y-3">
            {navLinks.map((link) => {
              const active = isActive(link.href, link.exact);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className={`block px-3.5 py-2.5 rounded-xl text-base font-serif italic transition-all duration-200 ${
                    active
                      ? "bg-primary/10 text-primary font-bold translate-x-1"
                      : "text-foreground/80 hover:text-primary hover:bg-accent/20"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
            <div className="pt-2">
              <Link
                href="/#events"
                onClick={() => setIsOpen(false)}
                className="block w-full text-center bg-primary text-background py-2.5 rounded-xl text-sm font-sans font-medium hover:bg-primary-light active:scale-98 transition-all duration-200 shadow-xs"
              >
                Browse Workshops
              </Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

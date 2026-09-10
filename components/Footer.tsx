import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="bg-primary-dark text-background mt-auto border-t border-secondary/20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand Col */}
          <div className="sm:col-span-2 lg:col-span-1">
            <Link href="/" className="inline-flex items-center gap-2 mb-4 group">
              <div className="w-10 h-10 rounded-full overflow-hidden bg-white/10 p-1 flex items-center justify-center border border-secondary/30">
                <Image src="/favicon.png" alt="Créer Club" width={32} height={32} className="object-contain rounded-full" />
              </div>
              <span className="text-2xl font-serif font-bold tracking-wide text-secondary group-hover:text-secondary-light transition-colors italic">
                Créer Club
              </span>
            </Link>
            <p className="text-sm text-secondary-light/80 leading-relaxed font-sans max-w-sm">
              A cozy haven for art, acrylic painting, and curated weekend workshops. Unwind with good music, great aesthetics, and a canvas of your own.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-semibold tracking-wider uppercase text-secondary mb-4">
              Explore
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/#events" className="text-secondary-light/80 hover:text-white transition-colors">
                  Upcoming Workshops
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-secondary-light/80 hover:text-white transition-colors">
                  Our Story & Mission
                </Link>
              </li>
              <li>
                <Link href="/gallery" className="text-secondary-light/80 hover:text-white transition-colors">
                  Past Workshops Gallery
                </Link>
              </li>
            </ul>
          </div>

          {/* The Experience */}
          <div>
            <h3 className="text-sm font-semibold tracking-wider uppercase text-secondary mb-4">
              The Experience
            </h3>
            <ul className="space-y-2.5 text-sm text-secondary-light/80">
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-secondary"></span>
                <span>100% Beginner Friendly</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-secondary"></span>
                <span>All Art Supplies Included</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-secondary"></span>
                <span>Step-by-Step Artist Guidance</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-secondary"></span>
                <span>Take Your Canvas Home</span>
              </li>
            </ul>
          </div>

          {/* Connect */}
          <div>
            <h3 className="text-sm font-semibold tracking-wider uppercase text-secondary mb-4">
              Connect With Us
            </h3>
            <p className="text-sm text-secondary-light/80 mb-4">
              Follow our journey, behind-the-scenes moments, and workshop drops on Instagram:
            </p>
            <a
              href="https://www.instagram.com/creer_club/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 text-white text-sm font-medium transition-all duration-200 border border-secondary/30 hover:border-secondary shadow-sm cursor-pointer"
            >
              <svg className="w-4 h-4 text-secondary fill-current" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
              <span>@creer_club</span>
            </a>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-secondary-light/60">
          <p>© 2026 Créer Club. Handcrafted with love & paint.</p>
          <div className="flex items-center gap-6">
            <span>Weekend Workshops</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

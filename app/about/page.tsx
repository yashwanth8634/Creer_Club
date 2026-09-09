import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About | Créer Club",
  description: "Learn about Créer Club — our story, mission, and the workshops we host.",
};

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-16 max-w-3xl">
      <h1 className="text-5xl font-serif font-bold text-primary mb-4 italic">About Créer Club</h1>
      <div className="w-16 h-1 bg-secondary rounded-full mb-10"></div>

      <div className="prose prose-lg max-w-none space-y-8 text-foreground/80 leading-relaxed">
        <section>
          <h2 className="text-2xl font-serif font-bold text-primary mb-3">Our Story</h2>
          <p>
            Créer Club was born from a simple idea — that creativity shouldn't be locked behind years of training or expensive studios. We wanted to create a space where anyone could walk in, pick up a brush, and leave with something they made with their own hands.
          </p>
          <p className="mt-4">
            What started as a small weekend gathering among friends quickly grew into a community of painters, dreamers, and weekend artists who share one thing in common: the joy of making.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-serif font-bold text-primary mb-3">Our Mission</h2>
          <p>
            To make art accessible, affordable, and above all — <em>fun</em>. Every Créer Club workshop is designed to be beginner-friendly, with guided instruction, all materials provided, and a warm, cozy atmosphere that makes you feel right at home.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-serif font-bold text-primary mb-3">What We Do</h2>
          <ul className="list-none space-y-3 mt-4">
            {[
              "🎨 Canvas & Acrylic Painting Workshops",
              "👜 Tote Bag Painting Sessions",
              "🖼️ Themed paint nights for special occasions",
              "🌿 Workshops in cozy, aesthetic venues across the city",
            ].map((item) => (
              <li key={item} className="flex items-center gap-3 bg-accent/20 px-4 py-3 rounded-lg border border-accent/40">
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-serif font-bold text-primary mb-3">Who Is This For?</h2>
          <p>
            Everyone. Absolutely everyone. Whether you've never held a paintbrush or you paint every weekend, our workshops are paced and structured so you can follow along and create something beautiful — guaranteed.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-serif font-bold text-primary mb-3">Follow Along</h2>
          <p>
            We post our work, behind-the-scenes moments, and upcoming event announcements on Instagram. Come say hello!
          </p>
          <a
            href="https://www.instagram.com/creer_club/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block mt-4 bg-primary text-background px-8 py-3 rounded-full font-medium hover:bg-primary-light transition-colors"
          >
            @creer_club on Instagram
          </a>
        </section>
      </div>
    </div>
  );
}

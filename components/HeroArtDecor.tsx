/**
 * Subtle, elegant art-theme decorative layer for the hero section.
 * Pure SVG — no raster images. Stays strictly in the background (z-0)
 * and never overlaps text or photo cards.
 *
 * Strategy:
 *  - A few large, very-low-opacity blurred organic blobs create a soft
 *    painterly warmth without covering anything.
 *  - Tiny crisp paint-drop clusters appear only in the right-side "air"
 *    region between the columns (desktop) or below the buttons (mobile).
 *  - A delicate curved brush stroke beneath the headline anchors the
 *    title without obscuring it.
 */

// ─── Background ambient blobs ───────────────────────────────────────────────

/** Soft, blurred ambient color washes behind the entire hero. */
export function HeroAmbientBlobs() {
  return (
    <svg
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 w-full h-full select-none z-0"
      viewBox="0 0 1440 560"
      fill="none"
      preserveAspectRatio="xMidYMid slice"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <filter id="amb-blur" x="-40%" y="-40%" width="180%" height="180%">
          <feGaussianBlur stdDeviation="60" />
        </filter>
      </defs>

      {/* Warm gold glow — upper-right */}
      <ellipse
        cx="1060" cy="140" rx="220" ry="140"
        fill="#D4AF37" opacity="0.12" filter="url(#amb-blur)"
      />
      {/* Deep burgundy glow — lower-left */}
      <ellipse
        cx="280" cy="420" rx="200" ry="120"
        fill="#800000" opacity="0.10" filter="url(#amb-blur)"
      />
      {/* Terracotta — centre bridge */}
      <ellipse
        cx="730" cy="290" rx="180" ry="100"
        fill="#C86D51" opacity="0.08" filter="url(#amb-blur)"
      />
    </svg>
  );
}

// ─── Paint-drop clusters (crisp, small) ─────────────────────────────────────

interface Dot { cx: number; cy: number; r: number; fill: string; opacity: number }

const DESKTOP_DOTS: Dot[] = [
  // Bridge zone: roughly x 580–820, y 80–480
  { cx: 612, cy: 108, r: 5.5, fill: "#800000", opacity: 0.55 },
  { cx: 620, cy:  99, r: 2.2, fill: "#800000", opacity: 0.40 },
  { cx: 605, cy: 118, r: 1.4, fill: "#800000", opacity: 0.35 },

  { cx: 680, cy: 160, r: 4.5, fill: "#D4AF37", opacity: 0.60 },
  { cx: 688, cy: 153, r: 1.8, fill: "#D4AF37", opacity: 0.45 },
  { cx: 675, cy: 168, r: 1.2, fill: "#D4AF37", opacity: 0.35 },

  { cx: 640, cy: 230, r: 3.8, fill: "#C86D51", opacity: 0.50 },
  { cx: 647, cy: 224, r: 1.5, fill: "#C86D51", opacity: 0.35 },

  { cx: 750, cy: 195, r: 5.0, fill: "#800000", opacity: 0.45 },
  { cx: 759, cy: 188, r: 2.0, fill: "#800000", opacity: 0.32 },
  { cx: 743, cy: 204, r: 1.3, fill: "#800000", opacity: 0.28 },

  { cx: 790, cy: 270, r: 3.5, fill: "#D4AF37", opacity: 0.55 },
  { cx: 797, cy: 264, r: 1.4, fill: "#D4AF37", opacity: 0.38 },

  { cx: 820, cy: 340, r: 4.2, fill: "#6B7F5E", opacity: 0.42 },
  { cx: 828, cy: 334, r: 1.7, fill: "#6B7F5E", opacity: 0.30 },

  { cx: 700, cy: 390, r: 3.0, fill: "#D9827B", opacity: 0.48 },
  { cx: 706, cy: 384, r: 1.2, fill: "#D9827B", opacity: 0.32 },

  { cx: 660, cy: 440, r: 5.2, fill: "#800000", opacity: 0.38 },
  { cx: 668, cy: 433, r: 2.1, fill: "#800000", opacity: 0.26 },
  { cx: 654, cy: 449, r: 1.3, fill: "#800000", opacity: 0.22 },

  // Far-right area near photos — light touches
  { cx: 940, cy: 100, r: 3.8, fill: "#D4AF37", opacity: 0.38 },
  { cx: 947, cy:  94, r: 1.5, fill: "#D4AF37", opacity: 0.26 },

  { cx: 980, cy: 430, r: 4.0, fill: "#C86D51", opacity: 0.32 },
  { cx: 987, cy: 424, r: 1.6, fill: "#C86D51", opacity: 0.22 },
];

/** Crisp acrylic paint-drop clusters in the gap between text & photos (desktop only). */
export function HeroDesktopDrops() {
  return (
    <svg
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 w-full h-full select-none z-0 hidden lg:block"
      viewBox="0 0 1440 560"
      fill="none"
      preserveAspectRatio="xMidYMid slice"
      xmlns="http://www.w3.org/2000/svg"
    >
      {DESKTOP_DOTS.map((d, i) => (
        <circle key={i} cx={d.cx} cy={d.cy} r={d.r} fill={d.fill} opacity={d.opacity} />
      ))}
    </svg>
  );
}

/** Crisp acrylic paint-drop clusters shown on mobile/tablet (below buttons, above photos). */
export function HeroMobileDrops() {
  // Mobile dots: centred vertically between buttons (≈ y 300) and photos (≈ y 420)
  const dots: Dot[] = [
    { cx: 155, cy: 20, r: 5.0, fill: "#800000", opacity: 0.55 },
    { cx: 164, cy: 14, r: 2.0, fill: "#800000", opacity: 0.40 },
    { cx: 149, cy: 28, r: 1.3, fill: "#800000", opacity: 0.32 },

    { cx: 210, cy: 32, r: 4.0, fill: "#D4AF37", opacity: 0.60 },
    { cx: 218, cy: 26, r: 1.6, fill: "#D4AF37", opacity: 0.42 },

    { cx: 175, cy: 55, r: 3.5, fill: "#C86D51", opacity: 0.50 },
    { cx: 182, cy: 49, r: 1.4, fill: "#C86D51", opacity: 0.34 },

    { cx: 235, cy: 60, r: 4.5, fill: "#D9827B", opacity: 0.45 },
    { cx: 243, cy: 54, r: 1.8, fill: "#D9827B", opacity: 0.30 },

    { cx: 120, cy: 48, r: 3.2, fill: "#6B7F5E", opacity: 0.42 },
    { cx: 127, cy: 43, r: 1.2, fill: "#6B7F5E", opacity: 0.28 },

    { cx: 265, cy: 28, r: 3.0, fill: "#800000", opacity: 0.40 },
    { cx: 271, cy: 22, r: 1.2, fill: "#800000", opacity: 0.28 },
  ];

  return (
    <div
      aria-hidden="true"
      className="block lg:hidden w-full overflow-hidden select-none pointer-events-none"
      style={{ height: "64px" }}
    >
      <svg
        viewBox="0 0 390 64"
        fill="none"
        className="w-full h-full"
        xmlns="http://www.w3.org/2000/svg"
      >
        {dots.map((d, i) => (
          <circle key={i} cx={d.cx} cy={d.cy} r={d.r} fill={d.fill} opacity={d.opacity} />
        ))}
      </svg>
    </div>
  );
}

// ─── Brush-stroke underline beneath the headline ─────────────────────────────

/** Organic hand-painted gold brush stroke to sit beneath "Créer Club". */
export function HeadlineBrushStroke() {
  return (
    <svg
      aria-hidden="true"
      className="w-full overflow-visible pointer-events-none"
      style={{ height: "10px", marginTop: "-4px", marginBottom: "8px" }}
      viewBox="0 0 300 10"
      fill="none"
      preserveAspectRatio="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Main stroke — slightly wavy, tapered, like a wide brush */}
      <path
        d="M 2,7 C 50,3 140,2 295,6 C 210,10 90,10 5,9 Z"
        fill="#D4AF37"
        opacity="0.70"
      />
      {/* Thinner, offset second stroke for brush texture */}
      <path
        d="M 8,8.5 C 70,6 180,5.5 290,7.5"
        stroke="#D4AF37"
        strokeWidth="1.2"
        strokeLinecap="round"
        opacity="0.35"
      />
    </svg>
  );
}

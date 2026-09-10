import type { Metadata } from "next";
import { Inter, Playfair_Display, Dancing_Script, Caveat } from "next/font/google";
import "./globals.css";
import PublicLayout from "@/components/PublicLayout";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
});

const dancingScript = Dancing_Script({
  subsets: ["latin"],
  variable: "--font-dancing-script",
  weight: ["400", "600", "700"],
});

const caveat = Caveat({
  subsets: ["latin"],
  variable: "--font-caveat",
  weight: ["400", "600"],
});

export const metadata: Metadata = {
  title: "Créer Club | Art Workshops",
  description: "A cozy place for art and painting workshops.",
  icons: {
    icon: [
      { url: "/favicon.png", type: "image/png" },
    ],
    apple: [
      { url: "/favicon.png" },
    ],
    shortcut: ["/favicon.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <body
        className={`${inter.variable} ${playfair.variable} ${dancingScript.variable} ${caveat.variable} font-sans antialiased min-h-screen flex flex-col bg-background text-foreground`}
      >
        <PublicLayout>{children}</PublicLayout>
      </body>
    </html>
  );
}
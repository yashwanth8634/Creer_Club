"use client";

import { usePathname } from "next/navigation";
import Navbar from "./Navbar";
import Footer from "./Footer";

/**
 * Renders Navbar and Footer only for public-facing pages.
 * Admin pages have their own embedded header and do not use the global nav.
 */
export default function PublicLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdmin = pathname.startsWith("/admin");

  return (
    <>
      {!isAdmin && <Navbar />}
      <main className="flex-grow flex flex-col">{children}</main>
      {!isAdmin && <Footer />}
    </>
  );
}

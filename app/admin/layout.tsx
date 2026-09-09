/**
 * Admin section layout — applies font-mono to all /admin/* pages.
 * Navbar and Footer are excluded via PublicLayout in the root layout.
 */
export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="font-mono">
      {children}
    </div>
  );
}

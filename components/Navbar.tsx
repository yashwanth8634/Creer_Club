import Link from 'next/link';
import Image from 'next/image';

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 w-full bg-background/90 backdrop-blur-md border-b border-accent shadow-sm">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="text-2xl font-serif italic font-bold text-primary tracking-wide">
          <Image src={'/logoo.png'} alt='logo' height={50} width={50}></Image>
        </Link>
        <div className="flex gap-6 text-sm font-medium font-serif italic">
          <Link href="/" className="text-foreground hover:text-primary transition-colors">Events</Link>
          <Link href="/about" className="text-foreground hover:text-primary transition-colors">About</Link>
          <Link href="/gallery" className="text-foreground hover:text-primary transition-colors">Gallery</Link>
        </div>
      </div>
    </nav>
  );
}

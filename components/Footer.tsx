export default function Footer() {
  return (
    <footer className="bg-primary-dark text-background py-10 mt-auto">
      <div className="container mx-auto px-4 flex flex-col items-center text-center">
        <h2 className="text-2xl font-serif font-bold mb-2 text-secondary">Créer Club</h2>
        <p className="mb-6 max-w-md mx-auto text-secondary-light font-sans">
          A cozy place for art, painting, and weekend workshops.
        </p>
        <div className="flex gap-4 mb-8">
          <a href="https://www.instagram.com/creer_club/" className="hover:text-secondary transition-colors font-[Georgia]">Instagram</a>
        </div>
        <p className="text-sm opacity-70">
          © {new Date().getFullYear()} Créer Club. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

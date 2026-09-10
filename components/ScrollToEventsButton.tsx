"use client";

export default function ScrollToEventsButton({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const target = document.getElementById("events");
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
      window.history.pushState(null, "", "#events");
    }
  };

  return (
    <a href="#events" onClick={handleClick} className={className}>
      {children}
    </a>
  );
}

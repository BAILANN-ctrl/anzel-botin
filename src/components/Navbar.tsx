"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

const links = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/projects", label: "Work" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const lastY = useRef(0);

  useEffect(() => {
    lastY.current = window.scrollY;

    const handleScroll = () => {
      const currentY = window.scrollY;
      const diff = currentY - lastY.current;

      setScrolled(currentY > 20);

      if (Math.abs(diff) < 8) return;

      if (currentY < 80) {
        setHidden(false);
      } else if (diff > 0) {
        setHidden(true);
      } else {
        setHidden(false);
      }

      lastY.current = currentY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className="sticky top-0 z-40 border-b backdrop-blur-md transition-all duration-300 ease-out"
      style={{
        borderColor: "var(--border)",
        background: "rgba(250, 250, 247, 0.85)",
        transform: hidden ? "translateY(-100%)" : "translateY(0)",
        boxShadow: scrolled ? "0 8px 24px -12px rgba(0, 0, 0, 0.12)" : "0 0 0 rgba(0,0,0,0)",
      }}
    >
      <nav className="flex w-full items-center justify-between px-6 py-5 md:px-10">
        <Link href="/" className="font-display text-lg tracking-tight">
          Anzel Victor Botin
        </Link>
        <div className="flex items-center gap-8 text-sm">
          {links.map((link, i) => (
            <Link
              key={link.href}
              href={link.href}
              className="group relative py-1 animate-nav-in transition-colors duration-500 ease-out hover:text-(--accent)"
              style={{
                color: "var(--muted)",
                animationDelay: `${i * 60}ms`,
              }}
            >
              {link.label}
              <span
                className="absolute -bottom-0.5 left-0 h-px w-0 transition-all duration-700 ease-out group-hover:w-full"
                style={{ background: "var(--accent)" }}
              />
            </Link>
          ))}
        </div>
      </nav>
    </header>
  );
}
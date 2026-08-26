"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { useScroll, useMotionValueEvent } from "framer-motion";

const links = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/projects", label: "Work" },
  { href: "/contact", label: "Contact" },
];
export default function Navbar() {
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const lastY = useRef(0);
  const menuRef = useRef<HTMLDivElement>(null);

  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    const currentY = latest;
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
  });

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };

    if (menuOpen) {
      window.addEventListener("keydown", onKeyDown);
    }

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [menuOpen]);

  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 768) setMenuOpen(false);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const closeMenu = useCallback(() => setMenuOpen(false), []);

  return (
    <header
      className="sticky top-0 z-40 border-b backdrop-blur-md transition-all duration-300 ease-out"
      style={{
        borderColor: scrolled ? "var(--border)" : "transparent",
        background: scrolled ? "rgba(250, 249, 246, 0.85)" : "rgba(250, 249, 246, 0)",
        transform: hidden ? "translateY(-100%)" : "translateY(0)",
        boxShadow: scrolled ? "0 1px 0 var(--border)" : "0 0 0 rgba(0,0,0,0)",
      }}
    >
      <nav className="flex w-full items-center justify-between px-6 py-5 md:px-10">
        {/* Logo */}
        <Link
          href="/"
          className="font-display text-lg tracking-tight md:text-lg"
          onClick={closeMenu}
        >
          Anzel Victor Botin
        </Link>

        {/* Desktop nav links */}
        <div className="hidden items-center gap-8 text-sm md:flex">
          {links.map((link, i) => (
            <Link
              key={link.href}
              href={link.href}
              className="group relative py-1 animate-nav-in transition-colors duration-300 ease-out hover:text-[var(--ink)]"
              style={{
                color: "var(--muted)",
                animationDelay: `${i * 60}ms`,
              }}
            >
              {link.label}
              <span
                className="absolute -bottom-0.5 left-0 h-px w-0 transition-all duration-300 ease-out group-hover:w-full"
                style={{ background: "var(--accent)" }}
              />
            </Link>
          ))}
        </div>

        {/* Hamburger button (mobile) */}
        <button
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((prev) => !prev)}
          className="relative z-50 flex flex-col items-center justify-center gap-[5px] md:hidden"
          style={{ width: 24, height: 24 }}
        >
          <span
            className="block h-px w-5 transition-all duration-300 ease-out"
            style={{
              background: "var(--ink)",
              transform: menuOpen
                ? "translateY(6px) rotate(45deg)"
                : "translateY(0) rotate(0)",
            }}
          />
          <span
            className="block h-px w-5 transition-all duration-300 ease-out"
            style={{
              background: "var(--ink)",
              opacity: menuOpen ? 0 : 1,
              transform: menuOpen ? "scaleX(0)" : "scaleX(1)",
            }}
          />
          <span
            className="block h-px w-5 transition-all duration-300 ease-out"
            style={{
              background: "var(--ink)",
              transform: menuOpen
                ? "translateY(-6px) rotate(-45deg)"
                : "translateY(0) rotate(0)",
            }}
          />
        </button>
      </nav>

      {/* Mobile menu overlay */}
      <div
        ref={menuRef}
        aria-hidden={!menuOpen}
        className="absolute left-0 w-full overflow-hidden transition-all duration-400 ease-out md:hidden"
        style={{
          top: "100%",
          height: menuOpen ? "calc(100vh - 100%)" : "0px",
          transitionProperty: "height",
        }}
      >
        {/* Backdrop */}
        <div
          className="absolute inset-0 transition-opacity duration-300 ease-out"
          style={{
            background: "rgba(250, 249, 246, 0.97)",
            backdropFilter: "blur(12px)",
            WebkitBackdropFilter: "blur(12px)",
            opacity: menuOpen ? 1 : 0,
          }}
          onClick={closeMenu}
        />

        {/* Links */}
        <div
          className="relative flex flex-col items-center justify-center gap-0 px-6"
          style={{
            paddingTop: "2rem",
            paddingBottom: "2rem",
          }}
        >
          {links.map((link, i) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={closeMenu}
              className="w-full text-center transition-all duration-500 ease-out hover:text-[var(--accent)]"
              style={{
                color: "var(--muted)",
                padding: "0.875rem 0",
                fontSize: "1.25rem",
                fontFamily: "var(--font-geist), system-ui, sans-serif",
                transform: menuOpen
                  ? "translateY(0)"
                  : "translateY(-12px)",
                opacity: menuOpen ? 1 : 0,
                transitionDelay: menuOpen ? `${i * 60}ms` : "0ms",
                borderBottom: i < links.length - 1 ? "1px solid var(--border)" : "none",
              }}
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </header>
  );
}

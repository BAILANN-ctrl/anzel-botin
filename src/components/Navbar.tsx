"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { useScroll, useMotionValueEvent } from "framer-motion";

const links = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/projects", label: "Work" },
  { href: "/playground", label: "Playground" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const lastY = useRef(0);
  const menuRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  const { scrollY } = useScroll();

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

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

  const audioCtxRef = useRef<AudioContext | null>(null);

  const playClick = useCallback(() => {
    const ctx = audioCtxRef.current ?? new AudioContext();
    audioCtxRef.current = ctx;

    const now = ctx.currentTime;
    const duration = 0.04;

    const bufferSize = Math.floor(ctx.sampleRate * duration);
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = (Math.random() * 2 - 1) * (1 - i / bufferSize);
    }

    const source = ctx.createBufferSource();
    source.buffer = buffer;

    const bandpass = ctx.createBiquadFilter();
    bandpass.type = "bandpass";
    bandpass.frequency.value = 3000;
    bandpass.Q.value = 1.5;

    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0.15, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + duration);

    source.connect(bandpass).connect(gain).connect(ctx.destination);
    source.start(now);
  }, []);

  const closeMenu = useCallback(() => setMenuOpen(false), []);

  return (
    <header className="fixed inset-x-0 top-0 z-40 px-4 pt-4 md:pt-6">
      <div
        className="relative z-50 flex w-full items-center justify-between rounded-full border px-5 py-2.5 transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] md:px-6"
        style={{
          borderColor: "var(--border-strong)",
          background: scrolled
            ? "rgba(8, 8, 14, 0.7)"
            : "rgba(8, 8, 14, 0.5)",
          boxShadow: "inset 0 1px 0 rgba(255,255,255,0.08), 0 12px 40px -20px rgba(6,20,16,0.9)",
          WebkitBackdropFilter: "blur(20px)",
          backdropFilter: "blur(20px)",
          transform: hidden ? "translateY(-130%)" : "translateY(0)",
        }}
      >
        {/* Logo */}
        <Link
          href="/"
          className="font-display text-base tracking-tight md:text-lg"
          onClick={() => { playClick(); closeMenu(); }}
        >
          Anzel Victor Botin<span style={{ color: "var(--accent)" }}></span>
        </Link>

        {/* Desktop nav links */}
        <div className="hidden items-center gap-1 text-sm md:flex">
          {links.map((link) => {
            const active = isActive(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                aria-current={active ? "page" : undefined}
                className="rounded-full px-4 py-2 transition-all duration-300 hover:bg-white/5"
                onClick={playClick}
                style={{
                  color: active ? "var(--ink)" : "var(--muted)",
                  background: active ? "rgba(255,255,255,0.06)" : "transparent",
                }}
              >
                <span
                  className="transition-colors hover:text-[var(--ink)]"
                  style={{
                    color: active ? "var(--accent)" : undefined,
                  }}
                >
                  {link.label}
                </span>
              </Link>
            );
          })}
        </div>

        {/* Mobile: hamburger that morphs to X */}
        <button
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((prev) => !prev)}
          className="relative z-50 flex flex-col items-center justify-center gap-[5px] md:hidden"
          style={{ width: 24, height: 24 }}
        >
          <span
            className="block h-px w-5 transition-all duration-300 ease-[cubic-bezier(0.32,0.72,0,1)]"
            style={{
              background: "var(--ink)",
              transform: menuOpen
                ? "translateY(6px) rotate(45deg)"
                : "translateY(0) rotate(0)",
            }}
          />
          <span
            className="block h-px w-5 transition-all duration-300 ease-[cubic-bezier(0.32,0.72,0,1)]"
            style={{
              background: "var(--ink)",
              opacity: menuOpen ? 0 : 1,
              transform: menuOpen ? "scaleX(0)" : "scaleX(1)",
            }}
          />
          <span
            className="block h-px w-5 transition-all duration-300 ease-[cubic-bezier(0.32,0.72,0,1)]"
            style={{
              background: "var(--ink)",
              transform: menuOpen
                ? "translateY(-6px) rotate(-45deg)"
                : "translateY(0) rotate(0)",
            }}
          />
        </button>
      </div>

      {/* Mobile full-screen glass overlay */}
      <div
        ref={menuRef}
        aria-hidden={!menuOpen}
        className="fixed inset-0 z-40 md:hidden"
        style={{
          pointerEvents: menuOpen ? "auto" : "none",
          opacity: menuOpen ? 1 : 0,
          visibility: menuOpen ? "visible" : "hidden",
        }}
      >
        <div
          className="absolute inset-0 transition-opacity duration-500 ease-out"
          style={{
            background: "rgba(5, 5, 10, 0.9)",
            WebkitBackdropFilter: "blur(28px)",
            backdropFilter: "blur(28px)",
            opacity: menuOpen ? 1 : 0,
          }}
          onClick={closeMenu}
        />
        <div className="relative flex h-full flex-col items-center justify-center gap-1 px-6">
          {links.map((link, i) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => { playClick(); closeMenu(); }}
              className="font-display w-full text-center text-[10vmin] leading-none tracking-tight transition-all duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] hover:text-[var(--accent)]"
              style={{
                color: "var(--ink)",
                padding: "1.5vmin 0",
                transform: menuOpen ? "translateY(0)" : "translateY(48px)",
                opacity: menuOpen ? 1 : 0,
                filter: menuOpen ? "blur(0)" : "blur(8px)",
                transitionDelay: menuOpen ? `${120 + i * 70}ms` : "0ms",
                transitionProperty: "transform, opacity, filter, color",
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

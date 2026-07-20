"use client";

import { useEffect, useRef } from "react";

export default function CustomCursor() {
  const hLineRef = useRef<HTMLDivElement>(null);
  const vLineRef = useRef<HTMLDivElement>(null);
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return; // skip on touch
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const cursor = cursorRef.current;
    const hLine = hLineRef.current;
    const vLine = vLineRef.current;
    if (!cursor || !hLine || !vLine) return;

    const onMove = (e: MouseEvent) => {
      cursor.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;

      const target = e.target as HTMLElement;
      const hovering = !!target.closest("a, button, [data-cursor-hover]");
      cursor.dataset.hover = String(hovering);
    };

    window.addEventListener("mousemove", onMove);

    // Force cursor:none on every element, not just body,
    // so it beats element-level `cursor: pointer` defaults.
    const style = document.createElement("style");
    style.setAttribute("data-custom-cursor", "true");
    style.textContent = "* { cursor: none !important; }";
    document.head.appendChild(style);

    return () => {
      window.removeEventListener("mousemove", onMove);
      style.remove();
    };
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-100 hidden md:block">
      <div ref={cursorRef} data-hover="false" className="fixed left-0 top-0 group/cursor">
        <div
          ref={hLineRef}
          className="absolute h-px w-4 -translate-x-1/2 -translate-y-1/2 transition-[width,opacity] duration-200
            group-data-[hover=true]/cursor:w-2 group-data-[hover=true]/cursor:opacity-40"
          style={{ background: "var(--ink)" }}
        />
        <div
          ref={vLineRef}
          className="absolute h-4 w-px -translate-x-1/2 -translate-y-1/2 transition-[height,opacity] duration-200
            group-data-[hover=true]/cursor:h-2 group-data-[hover=true]/cursor:opacity-40"
          style={{ background: "var(--ink)" }}
        />
      </div>
    </div>
  );
}
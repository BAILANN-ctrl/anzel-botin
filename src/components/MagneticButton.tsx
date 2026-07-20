"use client";

import { useRef } from "react";
import type { ReactNode, MouseEvent as ReactMouseEvent } from "react";

export default function MagneticButton({
  children,
  className = "",
  style,
  href,
  strength = 0.35,
}: {
  children: ReactNode;
  className?: string;
  style?: React.CSSProperties;
  href: string;
  strength?: number;
}) {
  const ref = useRef<HTMLAnchorElement>(null);

  const onMouseMove = (e: ReactMouseEvent<HTMLAnchorElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    el.style.transform = `translate(${x * strength}px, ${y * strength}px)`;
  };

  const onMouseLeave = () => {
    const el = ref.current;
    if (!el) return;
    el.style.transform = "translate(0, 0)";
  };

  return (
    <a
      ref={ref}
      href={href}
      data-cursor-hover
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      className={className}
      style={{
        ...style,
        display: "inline-block",
        transition: "transform 0.15s ease-out",
      }}
    >
      {children}
    </a>
  );
}

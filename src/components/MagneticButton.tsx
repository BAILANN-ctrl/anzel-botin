"use client";

import { useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
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
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springX = useSpring(x, { stiffness: 150, damping: 15, mass: 0.1 });
  const springY = useSpring(y, { stiffness: 150, damping: 15, mass: 0.1 });

  const onMouseMove = (e: ReactMouseEvent<HTMLAnchorElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const offsetX = e.clientX - rect.left - rect.width / 2;
    const offsetY = e.clientY - rect.top - rect.height / 2;
    x.set(offsetX * strength);
    y.set(offsetY * strength);
  };

  const onMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.a
      ref={ref}
      href={href}
      data-cursor-hover
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      className={className}
      style={{
        ...style,
        display: "inline-block",
        x: springX,
        y: springY,
      }}
    >
      {children}
    </motion.a>
  );
}

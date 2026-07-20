"use client";

import { useEffect, useRef, useState, ElementType } from "react";

export default function RevealText({
  children,
  as: Tag = "div",
  className = "",
  style,
  delay = 0,
}: {
  children: React.ReactNode;
  as?: ElementType;
  className?: string;
  style?: React.CSSProperties;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} style={{ overflow: "hidden" }}>
      <Tag
        className={className}
        style={{
          ...style,
          transform: visible ? "translateY(0%)" : "translateY(110%)",
          opacity: visible ? 1 : 0,
          transition: `transform 0.9s cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms, opacity 0.7s ease ${delay}ms`,
        }}
      >
        {children}
      </Tag>
    </div>
  );
}

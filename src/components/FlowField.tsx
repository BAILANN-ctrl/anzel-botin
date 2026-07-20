"use client";

import { useEffect, useRef } from "react";

// A field of particles drifting along a noise-derived flow field,
// gently deflected by the cursor. Renders behind the hero copy.
export default function FlowField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    let width = 0;
    let height = 0;
    let dpr = Math.min(window.devicePixelRatio || 1, 2);

    const mouse = { x: -9999, y: -9999 };

    const resize = () => {
      const parent = canvas.parentElement;
      if (!parent) return;
      width = parent.clientWidth;
      height = parent.clientHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener("resize", resize);

    const onMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    };
    const onLeave = () => {
      mouse.x = -9999;
      mouse.y = -9999;
    };
    window.addEventListener("mousemove", onMove);
    canvas.addEventListener("mouseleave", onLeave);

    // Simple pseudo-noise: sum of sines, cheap and seamless enough for a flow field.
    function noise(x: number, y: number, t: number) {
      return (
        Math.sin(x * 0.008 + t) * Math.cos(y * 0.008 - t * 0.7) +
        Math.sin((x + y) * 0.004 + t * 1.3) * 0.5
      );
    }

    const COUNT = reduceMotion ? 0 : 90;
    const particles = Array.from({ length: COUNT }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: 0,
      vy: 0,
      life: Math.random(),
    }));

    let t = 0;
    let raf = 0;

    const inkRGB = "20, 20, 18"; // matches --ink

    const draw = () => {
      t += 0.0025;
      ctx.clearRect(0, 0, width, height);

      for (const p of particles) {
        const angle = noise(p.x, p.y, t) * Math.PI * 2;
        let ax = Math.cos(angle) * 0.06;
        let ay = Math.sin(angle) * 0.06;

        // Gentle repulsion from cursor
        const dx = p.x - mouse.x;
        const dy = p.y - mouse.y;
        const distSq = dx * dx + dy * dy;
        const radius = 140;
        if (distSq < radius * radius) {
          const dist = Math.sqrt(distSq) || 1;
          const force = (1 - dist / radius) * 0.9;
          ax += (dx / dist) * force;
          ay += (dy / dist) * force;
        }

        p.vx = (p.vx + ax) * 0.94;
        p.vy = (p.vy + ay) * 0.94;
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < -10) p.x = width + 10;
        if (p.x > width + 10) p.x = -10;
        if (p.y < -10) p.y = height + 10;
        if (p.y > height + 10) p.y = -10;

        const speed = Math.hypot(p.vx, p.vy);
        const alpha = Math.min(0.35, 0.06 + speed * 0.25);

        ctx.beginPath();
        ctx.arc(p.x, p.y, 1.4, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${inkRGB}, ${alpha})`;
        ctx.fill();
      }

      raf = requestAnimationFrame(draw);
    };

    if (!reduceMotion) {
      raf = requestAnimationFrame(draw);
    }

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMove);
      canvas.removeEventListener("mouseleave", onLeave);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 h-full w-full"
      aria-hidden="true"
    />
  );
}

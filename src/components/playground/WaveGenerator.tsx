"use client";

import { useEffect, useRef, useState } from "react";

interface Ripple {
  x: number;
  y: number;
  radius: number;
  maxRadius: number;
  life: number;
}

export default function WaveGenerator() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number>(0);
  const timeRef = useRef(0);
  const mouseRef = useRef({ x: 0, y: 0, active: false });
  const ripplesRef = useRef<Ripple[]>([]);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsMobile("ontouchstart" in window || navigator.maxTouchPoints > 0);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.scale(dpr, dpr);
    };
    resize();
    window.addEventListener("resize", resize);

    const spawnRipple = (x: number, y: number) => {
      const rect = canvas.getBoundingClientRect();
      const maxRadius = Math.max(rect.width, rect.height) * 0.6;
      ripplesRef.current.push({ x, y, radius: 0, maxRadius, life: 1 });
    };

    const onMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current.x = e.clientX - rect.left;
      mouseRef.current.y = e.clientY - rect.top;
      mouseRef.current.active = true;
    };

    const onMouseLeave = () => {
      mouseRef.current.active = false;
    };

    const onClick = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      spawnRipple(e.clientX - rect.left, e.clientY - rect.top);
    };

    const onTouchMove = (e: TouchEvent) => {
      e.preventDefault();
      const rect = canvas.getBoundingClientRect();
      const touch = e.touches[0];
      mouseRef.current.x = touch.clientX - rect.left;
      mouseRef.current.y = touch.clientY - rect.top;
      mouseRef.current.active = true;
    };

    const onTouchEnd = (e: TouchEvent) => {
      if (e.changedTouches.length > 0) {
        const rect = canvas.getBoundingClientRect();
        const touch = e.changedTouches[0];
        spawnRipple(touch.clientX - rect.left, touch.clientY - rect.top);
      }
      mouseRef.current.active = false;
    };

    canvas.addEventListener("mousemove", onMouseMove);
    canvas.addEventListener("mouseleave", onMouseLeave);
    canvas.addEventListener("click", onClick);
    canvas.addEventListener("touchmove", onTouchMove, { passive: false });
    canvas.addEventListener("touchstart", onTouchMove, { passive: false });
    canvas.addEventListener("touchend", onTouchEnd);

    const draw = () => {
      const rect = canvas.getBoundingClientRect();
      ctx.clearRect(0, 0, rect.width, rect.height);

      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;
      const mouseActive = mouseRef.current.active;

      const waves = [
        { amp: 0.35, freq: 0.008, speed: 0.02, color: "52, 211, 153", width: 1.5 },
        { amp: 0.25, freq: 0.012, speed: 0.015, color: "56, 120, 255", width: 1 },
        { amp: 0.2, freq: 0.006, speed: 0.025, color: "52, 211, 153", width: 0.8 },
      ];

      waves.forEach((wave) => {
        ctx.beginPath();
        ctx.strokeStyle = `rgba(${wave.color}, 0.5)`;
        ctx.lineWidth = wave.width;

        for (let x = 0; x <= rect.width; x += 2) {
          let y =
            rect.height / 2 +
            Math.sin(x * wave.freq + timeRef.current * wave.speed) *
              rect.height *
              wave.amp *
              Math.sin(x * 0.003 + timeRef.current * 0.008);

          if (mouseActive) {
            const dx = x - mx;
            const dy = y - my;
            const dist = Math.sqrt(dx * dx + dy * dy);
            const influence = Math.max(0, 1 - dist / 180);
            const pull = (my - rect.height / 2) * influence * 0.4;
            y += pull;
          }

          for (const ripple of ripplesRef.current) {
            const dx = x - ripple.x;
            const distR = Math.abs(dx - ripple.radius);
            const ringWidth = 60;
            if (distR < ringWidth) {
              const strength = (1 - distR / ringWidth) * ripple.life;
              y += Math.sin(dx * 0.05) * 30 * strength;
            }
          }

          if (x === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.stroke();
      });

      const ripples = ripplesRef.current;
      for (let i = ripples.length - 1; i >= 0; i--) {
        const r = ripples[i];
        r.radius += 4;
        r.life -= 0.012;
        if (r.life <= 0) {
          ripples.splice(i, 1);
          continue;
        }
        ctx.beginPath();
        ctx.arc(r.x, r.y, r.radius, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(52, 211, 153, ${r.life * 0.15})`;
        ctx.lineWidth = 1;
        ctx.stroke();
      }

      if (mouseActive) {
        ctx.beginPath();
        ctx.arc(mx, my, 3, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(52, 211, 153, 0.5)";
        ctx.fill();

        ctx.beginPath();
        ctx.arc(mx, my, 12, 0, Math.PI * 2);
        ctx.strokeStyle = "rgba(52, 211, 153, 0.15)";
        ctx.lineWidth = 0.5;
        ctx.stroke();
      }

      const centerY = rect.height / 2;
      ctx.beginPath();
      ctx.setLineDash([2, 6]);
      ctx.strokeStyle = "rgba(255, 255, 255, 0.06)";
      ctx.lineWidth = 0.5;
      ctx.moveTo(0, centerY);
      ctx.lineTo(rect.width, centerY);
      ctx.stroke();
      ctx.setLineDash([]);

      timeRef.current += 1;
      rafRef.current = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", resize);
      canvas.removeEventListener("mousemove", onMouseMove);
      canvas.removeEventListener("mouseleave", onMouseLeave);
      canvas.removeEventListener("click", onClick);
      canvas.removeEventListener("touchmove", onTouchMove);
      canvas.removeEventListener("touchstart", onTouchMove);
      canvas.removeEventListener("touchend", onTouchEnd);
    };
  }, []);

  return (
    <div className="relative h-full w-full overflow-hidden rounded-2xl">
      <canvas
        ref={canvasRef}
        className="absolute inset-0 h-full w-full"
        style={{ touchAction: "none" }}
      />
      <div
        className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center"
        aria-hidden
      >
        <span
          className="font-mono text-[10px] uppercase tracking-[0.2em]"
          style={{ color: "var(--muted)" }}
        >
          {isMobile ? "Drag to distort · Tap for ripples" : "Move to distort · Click for ripples"}
        </span>
      </div>
    </div>
  );
}

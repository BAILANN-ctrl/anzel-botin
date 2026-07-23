"use client";

import { useState, useRef, type MouseEvent } from "react";
import Image from "next/image";
import { motion, AnimatePresence, type PanInfo } from "framer-motion";
import Lightbox from "./Lightbox";

interface ScreenshotGalleryProps {
  images: string[];
  projectName: string;
}

export default function ScreenshotGallery({
  images,
  projectName,
}: ScreenshotGalleryProps) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [mobileIndex, setMobileIndex] = useState(0);
  const constraintsRef = useRef<HTMLDivElement>(null);

  const openLightbox = (index: number) => setLightboxIndex(index);

  const closeLightbox = () => setLightboxIndex(null);

  const goToPrev = () =>
    setLightboxIndex((prev) =>
      prev !== null ? (prev - 1 + images.length) % images.length : null
    );

  const goToNext = () =>
    setLightboxIndex((prev) =>
      prev !== null ? (prev + 1) % images.length : null
    );

  // Drag handler for mobile swipe
  const handleDragEnd = (
    _: MouseEvent | TouchEvent,
    info: PanInfo
  ) => {
    const threshold = 60;
    const swipeForward = info.offset.x < -threshold || info.velocity.x < -300;
    const swipeBackward = info.offset.x > threshold || info.velocity.x > 300;

    if (swipeForward && mobileIndex < images.length - 1) {
      setMobileIndex((i) => i + 1);
    } else if (swipeBackward && mobileIndex > 0) {
      setMobileIndex((i) => i - 1);
    }
  };

  if (images.length === 0) return null;

  return (
    <div className="mt-14 md:mt-20">
      <h2
        className="mb-6 text-xs font-medium uppercase tracking-widest md:mb-8"
        style={{ color: "var(--muted)" }}
      >
        More screenshots
      </h2>

      {/* ─── Desktop: Grid (hidden on mobile) ─── */}
      <div className="hidden md:grid md:grid-cols-3 md:gap-5">
        {images.map((src, i) => (
          <button
            key={src}
            onClick={() => openLightbox(i)}
            className="relative aspect-video overflow-hidden rounded-xl border text-left transition-transform hover:scale-[1.02] focus-visible:outline-2 focus-visible:outline-offset-2"
            style={{ borderColor: "var(--border)" }}
          >
            <Image
              src={src}
              alt={`${projectName} screenshot ${i + 1}`}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 33vw, 25vw"
            />
          </button>
        ))}
      </div>

      {/* ─── Mobile: Swipeable carousel (hidden on desktop) ─── */}
      <div className="md:hidden" ref={constraintsRef}>
        <div className="relative overflow-hidden rounded-xl border" style={{ borderColor: "var(--border)" }}>
          <AnimatePresence mode="popLayout">
            <motion.div
              key={mobileIndex}
              drag="x"
              dragConstraints={constraintsRef}
              dragElastic={0.3}
              onDragEnd={handleDragEnd}
              onClick={() => openLightbox(mobileIndex)}
              className="relative aspect-video w-full cursor-pointer overflow-hidden"
              initial={{ opacity: 0, x: 80 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -80 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >
              <Image
                src={images[mobileIndex]}
                alt={`${projectName} screenshot ${mobileIndex + 1}`}
                fill
                className="pointer-events-none object-cover"
                sizes="100vw"
                priority={mobileIndex === 0}
              />
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Dot indicators */}
        {images.length > 1 && (
          <div className="mt-4 flex items-center justify-center gap-2">
            {images.map((_, i) => (
              <button
                key={i}
                onClick={() => setMobileIndex(i)}
                className="rounded-full transition-all duration-200"
                style={{
                  width: i === mobileIndex ? 24 : 8,
                  height: 8,
                  background:
                    i === mobileIndex ? "var(--ink)" : "var(--border)",
                }}
                aria-label={`Go to screenshot ${i + 1}`}
              />
            ))}
          </div>
        )}
      </div>

      {/* ─── Lightbox (shared for mobile + desktop) ─── */}
      {lightboxIndex !== null && (
        <Lightbox
          images={images}
          currentIndex={lightboxIndex}
          onClose={closeLightbox}
          onPrev={goToPrev}
          onNext={goToNext}
          projectName={projectName}
        />
      )}
    </div>
  );
}


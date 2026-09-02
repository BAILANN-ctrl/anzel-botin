"use client";

import { Mail, MapPin, ExternalLink } from "lucide-react";
import RevealText from "@/components/RevealText";
import ContactForm from "@/components/ContactForm";

export default function ContactPage() {
  return (
    <div className="px-6 pt-28 pb-8 md:px-14 md:pt-32 lg:px-20">
      <div className="grid gap-16 md:grid-cols-[1fr_1.2fr] md:gap-20">
        {/* Left: editorial headline + quick options */}
        <div>
          <RevealText
            as="h1"
            delay={0}
            className="font-display text-[clamp(2.5rem,6vw,5rem)] leading-[1] tracking-[-0.03em]"
          >
            Let&apos;s talk.
          </RevealText>
          <RevealText as="p" delay={120} className="mt-6 max-w-md text-lg leading-relaxed" style={{ color: "var(--muted)" }}>
            Have a role, project, or question? Fill this out and I&apos;ll reply
            as soon as I can.
          </RevealText>

          <RevealText as="div" delay={200}>
            <div className="mt-10 flex flex-col gap-4 md:items-start">
              <a
                href="mailto:anzelbotin@gmail.com"
                className="inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm transition-all hover:border-[var(--accent)] hover:text-[var(--accent)]"
                style={{ borderColor: "var(--border)", color: "var(--muted)" }}
              >
                <Mail size={14} />
                Email
              </a>
              <a
                href="https://linkedin.com/in/anzelbotin"
                className="inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm transition-all hover:border-[var(--accent)] hover:text-[var(--accent)]"
                style={{ borderColor: "var(--border)", color: "var(--muted)" }}
              >
                <ExternalLink size={14} />
                LinkedIn
              </a>
              <span
                className="inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm"
                style={{ borderColor: "var(--border)", color: "var(--muted)" }}
              >
                <MapPin size={14} />
                Albay, Philippines
              </span>
            </div>
          </RevealText>
        </div>

        {/* Right: form */}
        <RevealText as="div" delay={280}>
          <ContactForm />
        </RevealText>
      </div>
    </div>
  );
}

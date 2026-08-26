"use client";

import { Mail, MapPin, ExternalLink } from "lucide-react";
import RevealText from "@/components/RevealText";
import ContactForm from "@/components/ContactForm";

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-xl md:max-w-3xl lg:max-w-4xl px-6 py-8 md:py-8">
      <div className="max-w-xl">
        <RevealText
          as="p"
          className="text-xs font-medium uppercase tracking-[0.2em]"
          style={{ color: "var(--accent)" }}
        >
          Contact
        </RevealText>
        <RevealText as="h1" delay={80} className="font-display mt-4 text-3xl md:text-5xl">
          Let&apos;s talk.
        </RevealText>
        <RevealText as="p" delay={160} className="mt-4 text-base md:text-lg" style={{ color: "var(--muted)" }}>
          Have a role, project, or question? Fill this out and I&apos;ll reply
          as soon as I can.
        </RevealText>

        {/* Quick contact options */}
        <RevealText as="div" delay={240}>
          <div className="mt-8 flex flex-wrap gap-4">
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
      <RevealText as="div" delay={320}>
        <div className="mt-10 md:mt-12">
          <ContactForm />
        </div>
      </RevealText>
    </div>
  );
}

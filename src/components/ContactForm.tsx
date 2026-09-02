"use client";

import { useState, useRef } from "react";

type Status = "idle" | "sending" | "sent" | "error";

export default function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const formRef = useRef<HTMLFormElement>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");

    const form = formRef.current;
    if (!form) return;

    const formData = new FormData(form);
    const payload = {
      name: formData.get("name"),
      email: formData.get("email"),
      message: formData.get("message"),
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const body = await res.json().catch(() => null);
        console.error("Contact form failed:", res.status, body);
        setStatus("error");
        return;
      }

      setStatus("sent");
      form.reset();
    } catch (err) {
      console.error("Contact form network error:", err);
      setStatus("error");
    }
  }

  const inputClasses =
    "mt-2 w-full rounded-xl border px-4 py-3 text-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[var(--accent)] focus:border-[var(--accent)] placeholder:text-zinc-500";
  const inputStyle = {
    background: "rgba(255,255,255,0.04)",
    borderColor: "var(--border)",
    color: "var(--ink)",
  };

  return (
    <div className="glass-panel p-1.5">
      <form ref={formRef} onSubmit={handleSubmit} className="glass-inner space-y-8 p-6 md:p-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          {/* Left column: Name + Email */}
          <div className="space-y-5">
            <div>
              <label
                htmlFor="name"
                className="text-sm font-medium"
                style={{ color: "var(--ink)" }}
              >
                Name
              </label>
              <input
                id="name"
                name="name"
                required
                disabled={status === "sending"}
                className={inputClasses}
                style={inputStyle}
              />
            </div>

            <div>
              <label
                htmlFor="email"
                className="text-sm font-medium"
                style={{ color: "var(--ink)" }}
              >
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                disabled={status === "sending"}
                className={inputClasses}
                style={inputStyle}
              />
            </div>
          </div>

          {/* Right column: Message */}
          <div className="flex flex-col">
            <label
              htmlFor="message"
              className="text-sm font-medium"
              style={{ color: "var(--ink)" }}
            >
              Message
            </label>
            <textarea
              id="message"
              name="message"
              required
              disabled={status === "sending"}
              className={`mt-2 w-full flex-1 rounded-xl border px-4 py-3 text-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[var(--accent)] focus:border-[var(--accent)] min-h-[160px] placeholder:text-zinc-500`}
              style={inputStyle}
            />
          </div>
        </div>

        <div className="flex items-center gap-4">
          <button
            type="submit"
            disabled={status === "sending"}
            className="group btn-primary disabled:pointer-events-none disabled:opacity-50"
          >
            {status === "sending" ? "Sending..." : "Send message"}
            {status === "idle" && (
              <span
                className="inline-flex h-7 w-7 items-center justify-center rounded-full transition-transform duration-500 group-hover:translate-x-0.5"
                style={{ background: "rgba(5,5,10,0.15)" }}
              >
                &rarr;
              </span>
            )}
          </button>

          {status === "sent" && (
            <p className="text-sm font-medium" style={{ color: "var(--accent)" }} role="status">
              Sent - I&apos;ll reply within a day or two.
            </p>
          )}
          {status === "error" && (
            <p className="text-sm" style={{ color: "#f87171" }} role="alert">
              Didn&apos;t go through. Email me directly at{" "}
              <a
                href="mailto:anzelbotin@gmail.com"
                className="underline transition-colors hover:text-[var(--accent)]"
              >
                anzelbotin@gmail.com
              </a>
              .
            </p>
          )}
        </div>
      </form>
    </div>
  );
}

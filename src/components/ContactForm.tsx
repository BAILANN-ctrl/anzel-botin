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

  const inputStyle = {
    background: "var(--bg-raised)",
    borderColor: "var(--border)",
    color: "var(--ink)",
  };

  return (
    <form ref={formRef} onSubmit={handleSubmit} className="space-y-5">
      <div>
        <label htmlFor="name" className="text-sm" style={{ color: "var(--muted)" }}>
          Name
        </label>
        <input
          id="name"
          name="name"
          required
          disabled={status === "sending"}
          className="mt-2 w-full rounded-xl border px-4 py-3 text-sm transition-colors focus:outline-none focus:ring-2"
          style={{ ...inputStyle, ["--tw-ring-color" as string]: "var(--accent)" }}
        />
      </div>

      <div>
        <label htmlFor="email" className="text-sm" style={{ color: "var(--muted)" }}>
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          disabled={status === "sending"}
          className="mt-2 w-full rounded-xl border px-4 py-3 text-sm transition-colors focus:outline-none focus:ring-2"
          style={{ ...inputStyle, ["--tw-ring-color" as string]: "var(--accent)" }}
        />
      </div>

      <div>
        <label htmlFor="message" className="text-sm" style={{ color: "var(--muted)" }}>
          Message
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          disabled={status === "sending"}
          className="mt-2 w-full rounded-xl border px-4 py-3 text-sm transition-colors focus:outline-none focus:ring-2"
          style={{ ...inputStyle, ["--tw-ring-color" as string]: "var(--accent)" }}
        />
      </div>

      <div className="flex items-center gap-4">
        <button
          type="submit"
          disabled={status === "sending"}
          className="rounded-full px-6 py-3 text-sm font-medium text-white transition-opacity hover:opacity-90 disabled:opacity-50"
          style={{ background: "var(--ink)" }}
        >
          {status === "sending" ? "Sending…" : "Send message →"}
        </button>

        {status === "sent" && (
          <p className="text-sm" style={{ color: "var(--accent)" }} role="status">
            Sent — I&apos;ll reply within a day or two.
          </p>
        )}
        {status === "error" && (
          <p className="text-sm" style={{ color: "#993C1D" }} role="alert">
            Didn&apos;t go through. Email me directly at{" "}
            <a href="mailto:you@example.com" className="underline">
              you@example.com
            </a>
            .
          </p>
        )}
      </div>
    </form>
  );
}
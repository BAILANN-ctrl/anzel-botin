"use client";

import { useState } from "react";

type Status = "idle" | "sending" | "sent" | "error";

export default function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");

    const form = new FormData(e.currentTarget);
    const payload = {
      name: form.get("name"),
      email: form.get("email"),
      message: form.get("message"),
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error();
      setStatus("sent");
      e.currentTarget.reset();
    } catch {
      setStatus("error");
    }
  }

  const inputStyle = {
    background: "var(--bg-raised)",
    borderColor: "var(--border)",
    color: "var(--ink)",
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <label htmlFor="name" className="text-sm" style={{ color: "var(--muted)" }}>
          Name
        </label>
        <input
          id="name"
          name="name"
          required
          className="mt-2 w-full rounded-xl border px-4 py-3 text-sm focus:outline-none"
          style={inputStyle}
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
          className="mt-2 w-full rounded-xl border px-4 py-3 text-sm focus:outline-none"
          style={inputStyle}
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
          className="mt-2 w-full rounded-xl border px-4 py-3 text-sm focus:outline-none"
          style={inputStyle}
        />
      </div>

      <button
        type="submit"
        disabled={status === "sending"}
        className="rounded-full px-6 py-3 text-sm font-medium text-white transition-opacity hover:opacity-90 disabled:opacity-50"
        style={{ background: "var(--ink)" }}
      >
        {status === "sending" ? "Sending..." : "Send message →"}
      </button>

      {status === "sent" && (
        <p className="text-sm" style={{ color: "var(--accent)" }}>
          Message sent. I&apos;ll get back to you soon.
        </p>
      )}
      {status === "error" && (
        <p className="text-sm" style={{ color: "#993C1D" }}>
          Something went wrong — try emailing me directly instead.
        </p>
      )}
    </form>
  );
}

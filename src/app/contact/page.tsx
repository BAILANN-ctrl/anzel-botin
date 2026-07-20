import ContactForm from "@/components/ContactForm";

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-xl px-6 py-24">
      <p className="text-sm uppercase tracking-widest" style={{ color: "var(--muted)" }}>
        Contact
      </p>
      <h1 className="font-display mt-4 text-4xl md:text-5xl">
        Let&apos;s talk.
      </h1>
      <p className="mt-4 text-lg" style={{ color: "var(--muted)" }}>
        Have a role, project, or question? Fill this out and I&apos;ll reply
        as soon as I can.
      </p>
      <div className="mt-10">
        <ContactForm />
      </div>
    </div>
  );
}

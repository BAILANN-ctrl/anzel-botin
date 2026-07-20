export default function Footer() {
  return (
    <footer className="border-t px-6 py-10" style={{ borderColor: "var(--border)" }}>
      <div className="flex w-full flex-wrap items-center justify-between gap-4 px-4 text-sm md:px-4">
        <span style={{ color: "var(--muted)" }}>
          © {new Date().getFullYear()} Anzel Victor F. Botin. Built with Next.js.
        </span>
        <div className="flex gap-6">
          <a
            href="https://linkedin.com/in/anzelbotin"
            className="transition-colors hover:text-[var(--accent)]"
            style={{ color: "var(--muted)" }}
          >
            LinkedIn
          </a>
          <a
            href="mailto:anzelbotin@gmail.com"
            className="transition-colors hover:text-[var(--accent)]"
            style={{ color: "var(--muted)" }}
          >
            Email
          </a>
        </div>
      </div>
    </footer>
  );
}

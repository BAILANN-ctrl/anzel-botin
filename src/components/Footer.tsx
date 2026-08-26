export default function Footer() {
  return (
    <footer
      className="border-t px-6 py-10 md:py-12"
      style={{ borderColor: "var(--border)" }}
    >
      <div className="mx-auto flex w-full max-w-6xl flex-col items-center justify-between gap-6 text-center md:flex-row md:text-left">
        <div className="flex flex-col gap-1">
          <span className="font-display text-sm">Anzel Victor F. Botin</span>
          <span className="text-xs" style={{ color: "var(--muted)" }}>
            Built with Next.js &middot; {new Date().getFullYear()}
          </span>
        </div>
        <div className="flex gap-6">
          <a
            href="https://linkedin.com/in/anzelbotin"
            className="text-sm transition-colors hover:text-[var(--accent)]"
            style={{ color: "var(--muted)" }}
          >
            LinkedIn
          </a>
          <a
            href="https://github.com/BAILANN-ctrl"
            className="text-sm transition-colors hover:text-[var(--accent)]"
            style={{ color: "var(--muted)" }}
          >
            GitHub
          </a>
          <a
            href="mailto:anzelbotin@gmail.com"
            className="text-sm transition-colors hover:text-[var(--accent)]"
            style={{ color: "var(--muted)" }}
          >
            Email
          </a>
        </div>
      </div>
    </footer>
  );
}

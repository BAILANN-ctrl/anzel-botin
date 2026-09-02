import Link from "next/link";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/projects", label: "Work" },
  { href: "/playground", label: "Playground" },
  { href: "/contact", label: "Contact" },
];

const socials = [
  { label: "LinkedIn", href: "https://linkedin.com/in/anzelbotin" },
  { label: "GitHub", href: "https://github.com/BAILANN-ctrl" },
  { label: "Email", href: "mailto:anzelbotin@gmail.com" },
];

export default function Footer() {
  return (
    <footer
      className="px-6 py-16 md:px-14 md:py-24 lg:px-20"
      style={{ borderTop: "1px solid var(--border)" }}
    >
      <div className="grid gap-12 md:grid-cols-[1.5fr_1fr_1fr] md:gap-8">
        {/* Name + tagline */}
        <div className="flex flex-col gap-3">
          <span className="font-display text-2xl md:text-3xl tracking-tight">
            Anzel Victor F. Botin<span style={{ color: "var(--accent)" }}>.</span>
          </span>
          <p className="max-w-xs text-sm leading-relaxed" style={{ color: "var(--muted)" }}>
            Full-stack developer building production web applications with
            React, Next.js, Node.js, and MySQL.
          </p>
        </div>

        {/* Site + Connect side by side on mobile, stacked as columns on desktop */}
        <div className="grid grid-cols-2 gap-8 md:col-span-2 md:grid-cols-2">
          {/* Nav */}
          <div className="flex flex-col gap-2">
            <span className="text-[10px] font-medium uppercase tracking-[0.2em]" style={{ color: "var(--muted)" }}>
              Site
            </span>
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm transition-colors hover:text-[var(--accent)]"
                style={{ color: "var(--muted)" }}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Socials */}
          <div className="flex flex-col gap-2">
            <span className="text-[10px] font-medium uppercase tracking-[0.2em]" style={{ color: "var(--muted)" }}>
              Connect
            </span>
            {socials.map((social) => (
              <a
                key={social.label}
                href={social.href}
                className="text-sm transition-colors hover:text-[var(--accent)]"
                style={{ color: "var(--muted)" }}
              >
                {social.label}
              </a>
            ))}
          </div>
        </div>
      </div>

      <div
        className="mt-16 flex flex-col items-center justify-between gap-3 pt-6 text-xs md:flex-row"
        style={{ borderTop: "1px solid var(--border)", color: "var(--muted)" }}
      >
        <span>Built with Next.js</span>
        <span>&copy; {new Date().getFullYear()} Anzel Victor F. Botin</span>
      </div>
    </footer>
  );
}

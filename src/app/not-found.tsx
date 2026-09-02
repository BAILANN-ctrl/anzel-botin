import Link from "next/link";
import RevealText from "@/components/RevealText";

export default function NotFound() {
  return (
    <div className="relative flex min-h-[70dvh] items-center justify-center overflow-hidden px-6 pb-16">
      <div className="relative mx-auto max-w-2xl text-center">
        <span className="font-mono text-sm" style={{ color: "var(--accent)" }}>
          error 404
        </span>
        <RevealText as="h1" delay={80} className="font-display mt-4 text-6xl leading-[1.02] md:text-8xl">
          Page not found
        </RevealText>
        <RevealText as="div" delay={160}>
          <p
            className="text-pretty mx-auto mt-6 max-w-md text-base leading-relaxed"
            style={{ color: "var(--muted)" }}
          >
            That address doesn&apos;t lead anywhere. Head back to the homepage —
            the work is all there.
          </p>
        </RevealText>
        <RevealText as="div" delay={240}>
          <div className="mt-10 flex justify-center">
            <Link href="/" data-cursor-hover className="btn-primary group px-7 py-3.5">
              Back to home
              <span
                className="inline-flex h-7 w-7 items-center justify-center rounded-full transition-transform duration-500 group-hover:-translate-x-0.5"
                style={{ background: "rgba(5,5,10,0.15)" }}
              >
                &larr;
              </span>
            </Link>
          </div>
        </RevealText>
      </div>
    </div>
  );
}

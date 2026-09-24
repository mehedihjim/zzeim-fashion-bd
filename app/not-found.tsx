import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Page not found | ZZEIM® Fashion",
};

export default function NotFound() {
  return (
    <main className="relative -mt-[var(--topbar-h)] flex h-svh min-h-144 flex-col overflow-hidden bg-black">
      <div
        aria-hidden
        className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,#4c0507_0%,transparent_65%)]"
      />

      <div className="relative mx-auto flex h-full w-full max-w-[2100px] flex-col justify-end px-4 pb-8 md:px-6 md:pb-12 lg:px-8">
        <div className="flex flex-col gap-10 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="mb-3 text-[15px] font-normal uppercase tracking-[0.3em] text-wine-light">
              Error 404
            </p>
            <p className="mb-2 max-w-[34ch] text-lg font-light leading-snug tracking-[0.06em] text-white/75">
              This page has left the collection. It may have moved, sold out, or
              never existed.
            </p>
            <h1 className="text-[clamp(6rem,26vw,26rem)] font-extralight leading-[0.8] tracking-[0.02em] text-wine">
              404
            </h1>
          </div>

          <div className="flex flex-col items-start gap-6 md:items-end">
            <Link
              href="/"
              className="group inline-flex items-center gap-4 border-b border-white/35 bg-black/25 px-7 py-3 text-lg font-light uppercase tracking-[0.3em] text-white backdrop-blur-sm transition-colors duration-300 hover:border-wine hover:bg-wine"
            >
              Back to home
              <ArrowUpRight
                size={20}
                strokeWidth={1.25}
                className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              />
            </Link>

            <nav aria-label="Shop" className="flex gap-8">
              {[
                { label: "Ladies", href: "/#ladies" },
                { label: "Gentlemen", href: "/#gentlemen" },
              ].map(({ label, href }) => (
                <Link
                  key={href}
                  href={href}
                  className="text-[15px] font-light uppercase tracking-[0.3em] text-foreground/55 transition-colors duration-300 hover:text-white"
                >
                  {label}
                </Link>
              ))}
            </nav>
          </div>
        </div>
      </div>
    </main>
  );
}

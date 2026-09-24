import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export default function Ladies() {
  return (
    <section
      id="ladies"
      className="relative h-svh min-h-144 overflow-hidden bg-white"
    >
      <video
        className="absolute inset-0 h-full w-full object-cover"
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        poster="/videos/ladies-poster.jpg"
        aria-hidden
      >
        <source src="/videos/ladies.mp4" type="video/mp4" />
      </video>

      <div
        aria-hidden
        className="absolute inset-0 bg-linear-to-bl from-white/70 via-white/10 to-transparent"
      />

      <div className="relative mx-auto flex h-full max-w-[2100px] flex-col justify-between px-4 pb-8 pt-20 md:px-6 md:pb-12 md:pt-24 lg:px-8">
        <div className="flex flex-col items-end gap-6 self-end text-right">
          <p className="max-w-[34ch] text-lg font-light leading-snug tracking-[0.06em] text-black/70">
            Sharp tailoring and soft silhouettes. Pieces designed to move from
            day to night.
          </p>

          <h2 className="text-[clamp(3rem,11vw,10rem)] font-light uppercase leading-[0.85] tracking-[0.03em] text-wine">
            Ladies
          </h2>
        </div>

        <Link
          href="/ladies"
          className="group inline-flex items-center gap-4 self-start border border-black/40 bg-white/30 px-7 py-3 text-lg font-light uppercase tracking-[0.3em] text-black backdrop-blur-sm transition-colors duration-300 hover:border-wine hover:bg-wine hover:text-white"
        >
          Shop Ladies
          <ArrowUpRight
            size={20}
            strokeWidth={1.25}
            className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
          />
        </Link>
      </div>
    </section>
  );
}

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export default function Gentlemen() {
  return (
    <section
      id="gentlemen"
      className="relative h-svh min-h-144 overflow-hidden bg-black"
    >
      <video
        className="absolute inset-0 h-full w-full object-cover"
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        poster="/videos/gentlemen-poster.jpg"
        aria-hidden
      >
        <source src="/videos/gentlemen.mp4" type="video/mp4" />
      </video>

      <div
        aria-hidden
        className="absolute inset-0 bg-linear-to-b from-black/60 via-black/10 to-black/85"
      />

      <div className="relative mx-auto flex h-full max-w-[2100px] flex-col justify-end px-4 pb-8 md:px-6 md:pb-12 lg:px-8">
        <div className="flex flex-col gap-8 md:flex-row-reverse md:items-end md:justify-between">
          <div className="flex flex-col items-end gap-6 self-end text-right">
            <p className="max-w-[34ch] text-lg font-light leading-snug tracking-[0.06em] text-white/75">
              Clean lines and considered fits. Built for the everyday, sharp
              enough for the after-hours.
            </p>
            <h2 className="text-[clamp(3rem,11vw,10rem)] font-light uppercase leading-[0.85] tracking-[0.03em] text-white">
              Gentlemen
            </h2>
          </div>

          <Link
            href="/gentlemen"
            className="group inline-flex items-center gap-4 self-start border-b border-white/35 bg-black/25 px-7 py-3 text-lg font-light uppercase tracking-[0.3em] text-white backdrop-blur-sm transition-colors duration-300 hover:border-wine hover:bg-wine"
          >
            Shop Gentlemen
            <ArrowUpRight
              size={20}
              strokeWidth={1.25}
              className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
            />
          </Link>
        </div>
      </div>
    </section>
  );
}

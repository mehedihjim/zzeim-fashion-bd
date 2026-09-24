"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Heart, Search, ShoppingBag, User } from "lucide-react";

const links = [
  { label: "Wardrobe", href: "/#wardrobe" },
  { label: "Ladies", href: "/#ladies" },
  { label: "Gentlemen", href: "/#gentlemen" },
];

const CART_COUNT = 2;

const iconBtn =
  "relative flex h-9 w-9 items-center justify-center text-foreground/70 transition-colors duration-300 hover:text-white";

type Panel = "menu" | "search" | null;

export default function Navbar() {
  const sentinelRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLInputElement>(null);
  const [stuck, setStuck] = useState(false);
  const [panel, setPanel] = useState<Panel>(null);

  const toggle = (p: Exclude<Panel, null>) =>
    setPanel((cur) => (cur === p ? null : p));

  useEffect(() => {
    const el = sentinelRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) =>
        setStuck(!entry.isIntersecting && entry.boundingClientRect.top < 0),
      { threshold: 0 },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!panel) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setPanel(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [panel]);

  useEffect(() => {
    if (panel === "search") searchRef.current?.focus({ preventScroll: true });
  }, [panel]);

  const solid = stuck || panel !== null;
  const menuOpen = panel === "menu";
  const searchOpen = panel === "search";

  return (
    <>
      <div ref={sentinelRef} aria-hidden className="-mb-px h-px" />
      <header
        className={`sticky top-0 z-50 -mb-[45px] border-b transition-[background-color,border-color,backdrop-filter] duration-300 ${
          solid
            ? "border-white/8 bg-black/90 backdrop-blur-md"
            : "border-transparent bg-transparent"
        }`}
      >
        <nav className="mx-auto flex h-11 max-w-[1760px] items-center justify-between px-4 md:grid md:grid-cols-[1fr_auto_1fr] md:px-8 lg:px-12">
          <Link href="/" aria-label="Home" className="justify-self-start">
            <Image
              src="/ZZEIM.png"
              alt="Store logo"
              width={160}
              height={48}
              priority
              className="h-6 w-auto"
            />
          </Link>

          <ul className="hidden items-center gap-14 md:flex">
            {links.map(({ label, href }) => (
              <li key={href}>
                <Link
                  href={href}
                  className="group relative block py-1 text-[17px] font-light uppercase tracking-[0.35em] text-foreground/60 transition-colors duration-300 hover:text-white"
                >
                  {label}
                  <span className="absolute -bottom-px left-0 right-[0.35em] h-px origin-center scale-x-0 bg-wine-light transition-transform duration-500 ease-out group-hover:scale-x-100" />
                </Link>
              </li>
            ))}
          </ul>

          <div className="-mr-2 flex items-center justify-self-end">
            <button
              type="button"
              aria-label="Search"
              aria-expanded={searchOpen}
              aria-controls="search-panel"
              onClick={() => toggle("search")}
              className={iconBtn}
            >
              <Search size={20} strokeWidth={1.25} />
            </button>

            <Link
              href="/account"
              aria-label="Account"
              className={`${iconBtn} hidden md:flex`}
            >
              <User size={20} strokeWidth={1.25} />
            </Link>

            <Link
              href="/wishlist"
              aria-label="Wishlist"
              className={`${iconBtn} hidden md:flex`}
            >
              <Heart size={20} strokeWidth={1.25} />
            </Link>

            <Link href="/cart" aria-label="Cart" className={iconBtn}>
              <ShoppingBag size={20} strokeWidth={1.25} />
              {CART_COUNT > 0 && (
                <span className="absolute right-0.5 top-1 min-w-3.75 rounded-full bg-wine px-1 text-center text-[11px] leading-3.75 text-white">
                  {CART_COUNT}
                </span>
              )}
            </Link>

            <button
              type="button"
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              onClick={() => toggle("menu")}
              className="relative flex h-10 w-10 items-center justify-center md:hidden"
            >
              <span
                className={`absolute h-px w-6 bg-foreground transition-transform duration-300 ${
                  menuOpen ? "rotate-45" : "-translate-y-1"
                }`}
              />
              <span
                className={`absolute h-px w-6 bg-foreground transition-transform duration-300 ${
                  menuOpen ? "-rotate-45" : "translate-y-1"
                }`}
              />
            </button>
          </div>
        </nav>

        <div
          id="search-panel"
          inert={!searchOpen}
          className={`absolute inset-x-0 top-full grid transition-[grid-template-rows] duration-300 ease-out ${
            searchOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
          }`}
        >
          <div className="overflow-hidden bg-black/95 backdrop-blur-md">
            <form
              action="/search"
              role="search"
              onSubmit={() => setPanel(null)}
              className="mx-auto flex max-w-[1760px] items-center gap-3 border-b border-white/8 px-4 py-3 md:px-8 lg:px-12"
            >
              <Search
                size={20}
                strokeWidth={1.25}
                className="shrink-0 text-foreground/50"
                aria-hidden
              />
              <input
                ref={searchRef}
                type="search"
                name="q"
                placeholder="Search the store"
                autoComplete="off"
                className="w-full bg-transparent text-xl font-light uppercase tracking-[0.25em] text-white outline-none placeholder:text-foreground/30"
              />
            </form>
          </div>
        </div>

        <div
          id="mobile-menu"
          inert={!menuOpen}
          className={`absolute inset-x-0 top-full grid transition-[grid-template-rows] duration-300 ease-out md:hidden ${
            menuOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
          }`}
        >
          <div className="overflow-hidden bg-black/95 backdrop-blur-md">
            <ul className="border-b border-white/8 px-4 py-2">
              {links.map(({ label, href }) => (
                <li
                  key={href}
                  className="border-b border-white/6 last:border-0"
                >
                  <Link
                    href={href}
                    onClick={() => setPanel(null)}
                    className="block py-4 text-lg font-light uppercase tracking-[0.35em] text-foreground/70 transition-colors hover:text-white"
                  >
                    {label}
                  </Link>
                </li>
              ))}
              <li className="flex gap-8 border-t border-white/8 py-4">
                <Link
                  href="/account"
                  onClick={() => setPanel(null)}
                  className="flex items-center gap-2 text-base font-light uppercase tracking-[0.3em] text-foreground/70 hover:text-white"
                >
                  <User size={18} strokeWidth={1.25} /> Account
                </Link>
                <Link
                  href="/wishlist"
                  onClick={() => setPanel(null)}
                  className="flex items-center gap-2 text-base font-light uppercase tracking-[0.3em] text-foreground/70 hover:text-white"
                >
                  <Heart size={18} strokeWidth={1.25} /> Wishlist
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </header>
    </>
  );
}

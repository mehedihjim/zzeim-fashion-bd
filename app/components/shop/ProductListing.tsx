"use client";

import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { products, type Gender } from "@/app/data/products";
import ProductCard from "./ProductCard";

const tabs = [
  { label: "All", href: "/wardrobe", gender: undefined },
  { label: "Ladies", href: "/ladies", gender: "ladies" },
  { label: "Gentlemen", href: "/gentlemen", gender: "gentlemen" },
] as const;

const sorts = [
  { value: "featured", label: "Featured" },
  { value: "price-asc", label: "Price: low to high" },
  { value: "price-desc", label: "Price: high to low" },
] as const;

const pill =
  "border px-4 py-1.5 text-[15px] font-light uppercase tracking-[0.25em] transition-colors duration-300";

export default function ProductListing({
  gender,
  title,
}: {
  gender?: Gender;
  title: string;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();

  const category = params.get("category") ?? "all";
  const sort = params.get("sort") ?? "featured";

  const setParam = (key: string, value: string, fallback: string) => {
    const next = new URLSearchParams(params.toString());
    if (value === fallback) next.delete(key);
    else next.set(key, value);
    const qs = next.toString();
    router.replace(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
  };

  const inScope = products.filter(
    (p) => !gender || p.gender === gender || p.gender === "unisex",
  );
  const categories = [...new Set(inScope.map((p) => p.category))];

  const visible = inScope
    .filter((p) => category === "all" || p.category === category)
    .sort((a, b) =>
      sort === "price-asc"
        ? a.price - b.price
        : sort === "price-desc"
          ? b.price - a.price
          : 0,
    );

  return (
    <main className="mx-auto max-w-[2100px] px-4 pb-24 pt-28 md:px-6 md:pt-36 lg:px-8">
      <header className="flex items-end justify-between gap-6">
        <h1 className="text-[clamp(3rem,11vw,10rem)] font-light uppercase leading-[0.85] tracking-[0.03em] text-white">
          {title}
        </h1>
        <p className="pb-1 text-lg font-light tracking-[0.12em] text-foreground/50">
          {visible.length} {visible.length === 1 ? "piece" : "pieces"}
        </p>
      </header>

      {/* Toolbar */}
      <div className="mt-10 flex flex-col gap-5 border-y border-white/10 py-4 md:mt-14 lg:flex-row lg:items-center lg:justify-between">
        <nav aria-label="Collection" className="flex gap-2">
          {tabs.map((t) => {
            const active = t.gender === gender;
            return (
              <Link
                key={t.href}
                href={t.href}
                aria-current={active ? "page" : undefined}
                className={`${pill} ${
                  active
                    ? "border-wine bg-wine text-white"
                    : "border-white/20 text-foreground/60 hover:border-white/50 hover:text-white"
                }`}
              >
                {t.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between lg:justify-end lg:gap-8">
          <div className="-mx-4 flex gap-2 overflow-x-auto px-4 md:mx-0 md:px-0">
            {["all", ...categories].map((c) => (
              <button
                key={c}
                type="button"
                aria-pressed={category === c}
                onClick={() => setParam("category", c, "all")}
                className={`${pill} shrink-0 ${
                  category === c
                    ? "border-white text-white"
                    : "border-transparent text-foreground/50 hover:text-white"
                }`}
              >
                {c === "all" ? "Everything" : c}
              </button>
            ))}
          </div>

          <label className="flex items-center gap-3 text-[15px] font-light uppercase tracking-[0.25em] text-foreground/50">
            Sort
            <select
              value={sort}
              onChange={(e) => setParam("sort", e.target.value, "featured")}
              className="border border-white/20 bg-black px-3 py-1.5 text-white outline-none focus-visible:border-wine-light"
            >
              {sorts.map((s) => (
                <option key={s.value} value={s.value}>
                  {s.label}
                </option>
              ))}
            </select>
          </label>
        </div>
      </div>

      {/* Grid */}
      {visible.length ? (
        <ul className="mt-8 grid grid-cols-2 gap-x-3 gap-y-10 md:grid-cols-3 md:gap-x-5 xl:grid-cols-4">
          {visible.map((p) => (
            <ProductCard key={p.slug} product={p} />
          ))}
        </ul>
      ) : (
        <div className="py-32 text-center">
          <p className="text-xl font-light uppercase tracking-[0.25em] text-white">
            Nothing matches these filters
          </p>
          <button
            type="button"
            onClick={() => router.replace(pathname, { scroll: false })}
            className="mt-6 border-b border-white/35 pb-1 text-lg font-light uppercase tracking-[0.3em] text-white hover:border-wine"
          >
            Clear filters
          </button>
        </div>
      )}
    </main>
  );
}

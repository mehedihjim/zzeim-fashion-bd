"use client";

import Link from "next/link";
import { products } from "@/app/data/products";
import { useWishlist } from "@/app/context/WishlistContext";
import ProductCard from "@/app/components/shop/ProductCard";

export default function WishlistView() {
  const { slugs, ready } = useWishlist();

  // Avoid flashing the empty state before localStorage is read
  if (!ready) return <main className="flex-1 pt-28" />;

  const saved = slugs.flatMap((s) => {
    const p = products.find((p) => p.slug === s);
    return p ? [p] : [];
  });

  return (
    <main className="mx-auto w-full max-w-[2100px] flex-1 px-4 pb-24 pt-28 md:px-6 md:pt-32 lg:px-8">
      <header className="mb-10 flex items-end justify-between gap-4 border-b border-white/8 pb-6">
        <h1 className="text-[clamp(3rem,8vw,7rem)] font-extralight uppercase leading-[0.85] tracking-[0.03em] text-white">
          Wishlist
        </h1>
        <span className="pb-1 text-lg font-light uppercase tracking-[0.3em] text-wine-light">
          {saved.length} {saved.length === 1 ? "piece" : "pieces"}
        </span>
      </header>

      {saved.length === 0 ? (
        <div className="flex flex-col items-start gap-6 py-16">
          <p className="max-w-[34ch] text-lg font-light leading-snug tracking-[0.06em] text-white/75">
            Nothing saved yet. Tap the heart on any piece to keep it here.
          </p>
          <Link
            href="/wardrobe"
            className="inline-flex items-center gap-4 border-b border-white/35 bg-black/25 px-7 py-3 text-lg font-light uppercase tracking-[0.3em] text-white transition-colors duration-300 hover:border-wine hover:bg-wine"
          >
            Browse the wardrobe
          </Link>
        </div>
      ) : (
        <ul className="grid grid-cols-2 gap-x-3 gap-y-10 md:grid-cols-3 md:gap-x-5 xl:grid-cols-4">
          {saved.map((p) => (
            <ProductCard key={p.slug} product={p} />
          ))}
        </ul>
      )}
    </main>
  );
}

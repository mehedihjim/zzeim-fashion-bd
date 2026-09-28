"use client";

import { Heart } from "lucide-react";
import { useWishlist } from "@/app/context/WishlistContext";

export default function WishlistButton({
  slug,
  className = "",
}: {
  slug: string;
  className?: string;
}) {
  const { has, toggle } = useWishlist();
  const saved = has(slug);

  return (
    <button
      type="button"
      aria-label={saved ? "Remove from wishlist" : "Add to wishlist"}
      aria-pressed={saved}
      onClick={() => toggle(slug)}
      className={`flex h-9 w-9 items-center justify-center bg-black/40 text-white backdrop-blur-sm transition-colors duration-300 hover:bg-black/70 ${className}`}
    >
      <Heart
        size={18}
        strokeWidth={1.25}
        className={saved ? "fill-wine-light text-wine-light" : ""}
      />
    </button>
  );
}

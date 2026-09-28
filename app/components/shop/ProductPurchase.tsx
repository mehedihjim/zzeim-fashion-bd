"use client";

import { useState } from "react";
import { Heart } from "lucide-react";
import { useCart } from "@/app/context/CartContext";
import { useWishlist } from "@/app/context/WishlistContext";

export default function ProductPurchase({
  slug,
  sizes,
  colors,
}: {
  slug: string;
  sizes: string[];
  colors: string[];
}) {
  const { add } = useCart();
  const [size, setSize] = useState<string | null>(null);
  const [color, setColor] = useState(0);
  const [error, setError] = useState(false);
  const [added, setAdded] = useState(false);
  const { has, toggle } = useWishlist();
  const saved = has(slug);

  const addToBag = () => {
    if (!size) {
      setError(true);
      return;
    }
    add(slug, size, color);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div className="space-y-8">
      {colors.length > 0 && (
        <fieldset>
          <legend className="mb-3 text-[15px] font-light uppercase tracking-[0.25em] text-foreground/50">
            Color
          </legend>
          <div className="flex gap-3">
            {colors.map((c, i) => (
              <button
                key={c}
                type="button"
                aria-label={`Color ${i + 1}`}
                aria-pressed={color === i}
                onClick={() => setColor(i)}
                style={{ backgroundColor: c }}
                className={`h-8 w-8 rounded-full border transition-shadow ${
                  color === i
                    ? "border-white shadow-[0_0_0_3px_#000,0_0_0_4px_rgba(255,255,255,0.7)]"
                    : "border-white/25 hover:border-white/60"
                }`}
              />
            ))}
          </div>
        </fieldset>
      )}

      <fieldset>
        <legend className="mb-3 flex w-full items-baseline justify-between text-[15px] font-light uppercase tracking-[0.25em] text-foreground/50">
          Size
          {error && (
            <span role="alert" className="tracking-[0.15em] text-wine-light">
              Select a size
            </span>
          )}
        </legend>
        <div className="grid grid-cols-5 gap-2">
          {sizes.map((s) => (
            <button
              key={s}
              type="button"
              aria-pressed={size === s}
              onClick={() => {
                setSize(s);
                setError(false);
              }}
              className={`border py-3 text-lg font-light tracking-[0.15em] transition-colors duration-300 ${
                size === s
                  ? "border-white bg-white text-black"
                  : "border-white/20 text-white hover:border-white/60"
              }`}
            >
              {s}
            </button>
          ))}
        </div>
      </fieldset>

      <div className="flex gap-2">
        <button
          type="button"
          onClick={addToBag}
          className="flex-1 border border-wine bg-wine px-7 py-4 text-lg font-light uppercase tracking-[0.3em] text-white transition-colors duration-300 hover:bg-wine-deep"
        >
          <span aria-live="polite">
            {added ? "Added to bag" : "Add to bag"}
          </span>
        </button>
        <button
          type="button"
          aria-label={saved ? "Remove from wishlist" : "Add to wishlist"}
          aria-pressed={saved}
          onClick={() => toggle(slug)}
          className="flex w-14 items-center justify-center border border-white/20 text-white transition-colors hover:border-white/60"
        >
          <Heart
            size={20}
            strokeWidth={1.25}
            className={saved ? "fill-wine-light text-wine-light" : ""}
          />
        </button>
      </div>
    </div>
  );
}

import Image from "next/image";
import Link from "next/link";
import type { Product } from "@/app/data/products";
import WishlistButton from "./WishlistButton";

export default function ProductCard({ product }: { product: Product }) {
  const { slug, name, price, category, colors, image, isNew } = product;

  return (
    <li>
      <WishlistButton slug={slug} className="absolute right-2 top-2 z-10" />
      <Link href={`/products/${slug}`} className="group block">
        <div className="relative aspect-[3/4] overflow-hidden bg-white/[0.04]">
          {image ? (
            <Image
              src={image}
              alt={name}
              fill
              sizes="(min-width:1280px) 25vw, (min-width:768px) 33vw, 50vw"
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
            />
          ) : (
            <span className="absolute inset-0 flex items-center justify-center text-sm font-light uppercase tracking-[0.35em] text-white/15">
              ZZEIM
            </span>
          )}

          {isNew && (
            <span className="absolute left-3 top-3 bg-wine px-2 py-0.5 text-[13px] font-light uppercase tracking-[0.2em] text-white">
              New
            </span>
          )}
        </div>

        <div className="mt-3 flex items-start justify-between gap-4">
          <div>
            <h3 className="text-lg font-light uppercase leading-tight tracking-[0.12em] text-white transition-colors group-hover:text-wine-light">
              {name}
            </h3>
            <p className="mt-0.5 text-[15px] font-light tracking-[0.08em] text-foreground/50">
              {category}
            </p>
          </div>
          <p className="text-lg font-light tracking-[0.08em] text-white">
            ${price}
          </p>
        </div>

        <ul className="mt-2 flex gap-1.5" aria-label="Available colors">
          {colors.map((c) => (
            <li
              key={c}
              style={{ backgroundColor: c }}
              className="h-3 w-3 rounded-full border border-white/25"
            />
          ))}
        </ul>
      </Link>
    </li>
  );
}

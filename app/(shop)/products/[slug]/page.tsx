import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { products } from "@/app/data/products";
import ProductCard from "@/app/components/shop/ProductCard";
import ProductPurchase from "@/app/components/shop/ProductPurchase";

type Props = { params: Promise<{ slug: string }> };

// Static site: build every product page at build time, 404 for anything else.
export const dynamicParams = false;
export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = products.find((p) => p.slug === slug);
  if (!product) return {};
  return {
    title: `${product.name} | ZZEIM® Fashion`,
    description:
      product.description ??
      `${product.name}, ${product.category.toLowerCase()} by ZZEIM.`,
  };
}

const defaultSizes = {
  ladies: ["XS", "S", "M", "L", "XL"],
  gentlemen: ["S", "M", "L", "XL", "XXL"],
  unisex: ["XS", "S", "M", "L", "XL"],
};

const sectionTitle =
  "cursor-pointer list-none py-4 text-lg font-light uppercase tracking-[0.25em] text-white";
const sectionBody =
  "pb-5 text-[17px] font-light leading-relaxed tracking-[0.04em] text-foreground/60";

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;
  const product = products.find((p) => p.slug === slug);
  if (!product) notFound();

  const { name, price, gender, category, colors, isNew } = product;
  const images = product.gallery ?? (product.image ? [product.image] : []);
  // Always show at least 2 panels so the layout holds before real photos exist.
  const panels = Array.from(
    { length: Math.max(images.length, 2) },
    (_, i) => images[i],
  );
  const collection = gender === "unisex" ? null : gender;
  const related = products
    .filter(
      (p) =>
        p.slug !== slug && (p.category === category || p.gender === gender),
    )
    .slice(0, 4);

  return (
    <main className="mx-auto max-w-[2100px] px-4 pb-24 pt-24 md:px-6 md:pt-28 lg:px-8">
      <nav
        aria-label="Breadcrumb"
        className="mb-6 flex flex-wrap gap-x-3 text-[15px] font-light uppercase tracking-[0.2em] text-foreground/50"
      >
        <Link href="/wardrobe" className="hover:text-white">
          Wardrobe
        </Link>
        {collection && (
          <>
            <span aria-hidden>/</span>
            <Link
              href={`/${collection}`}
              className="capitalize hover:text-white"
            >
              {collection}
            </Link>
          </>
        )}
        <span aria-hidden>/</span>
        <span aria-current="page" className="text-white">
          {name}
        </span>
      </nav>

      <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_28rem] lg:gap-14 xl:grid-cols-[minmax(0,1fr)_32rem]">
        {/* Gallery */}
        <div className="grid grid-cols-2 gap-2 md:gap-3">
          {panels.map((src, i) => (
            <div
              key={i}
              className={`relative aspect-[3/4] overflow-hidden bg-white/[0.04] ${
                i === 0 ? "col-span-2 md:col-span-2" : ""
              }`}
            >
              {src ? (
                <Image
                  src={src}
                  alt={i === 0 ? name : `${name}, view ${i + 1}`}
                  fill
                  priority={i === 0}
                  sizes="(min-width:1024px) 55vw, 100vw"
                  className="object-cover"
                />
              ) : (
                <span className="absolute inset-0 flex items-center justify-center text-sm font-light uppercase tracking-[0.35em] text-white/15">
                  ZZEIM
                </span>
              )}
            </div>
          ))}
        </div>

        {/* Info: sticks while the gallery scrolls on desktop */}
        <div className="lg:sticky lg:top-20 lg:self-start">
          {isNew && (
            <p className="mb-3 inline-block bg-wine px-2 py-0.5 text-[13px] font-light uppercase tracking-[0.2em] text-white">
              New
            </p>
          )}
          <h1 className="text-[clamp(2.5rem,5vw,4.5rem)] font-light uppercase leading-[0.9] tracking-[0.05em] text-white">
            {name}
          </h1>
          <p className="mt-3 text-2xl font-light tracking-[0.1em] text-white">
            ${price}
          </p>
          <p className="mt-1 text-[15px] font-light tracking-[0.08em] text-foreground/50">
            {category}
          </p>

          <div className="mt-10">
            <ProductPurchase
              slug={slug}
              sizes={product.sizes ?? defaultSizes[gender]}
              colors={colors}
            />
          </div>

          <div className="mt-10 divide-y divide-white/10 border-y border-white/10">
            <details open>
              <summary className={sectionTitle}>Description</summary>
              <p className={sectionBody}>
                {product.description ??
                  "Cut in a limited run and made to be lived in. Add your product description here."}
              </p>
            </details>
            <details>
              <summary className={sectionTitle}>Details</summary>
              <ul className={`${sectionBody} list-disc space-y-1 pl-5`}>
                {(product.details ?? ["Fabric and care details go here"]).map(
                  (d) => (
                    <li key={d}>{d}</li>
                  ),
                )}
              </ul>
            </details>
            <details>
              <summary className={sectionTitle}>Shipping &amp; returns</summary>
              <p className={sectionBody}>
                Free shipping on your first order. Easy 30-day returns, no
                questions asked.
              </p>
            </details>
          </div>
        </div>
      </div>

      {related.length > 0 && (
        <section aria-labelledby="related" className="mt-24">
          <h2
            id="related"
            className="mb-6 text-[clamp(1.75rem,3vw,2.5rem)] font-light uppercase tracking-[0.15em] text-white"
          >
            You may also like
          </h2>
          <ul className="grid grid-cols-2 gap-x-3 gap-y-10 md:grid-cols-4 md:gap-x-5">
            {related.map((p) => (
              <ProductCard key={p.slug} product={p} />
            ))}
          </ul>
        </section>
      )}
    </main>
  );
}

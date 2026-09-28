import { Suspense } from "react";
import type { Metadata } from "next";
import ProductListing from "@/app/components/shop/ProductListing";

export const metadata: Metadata = {
  title: "Wardrobe | ZZEIM® Fashion",
  description: "The full ZZEIM wardrobe: every piece for ladies and gentlemen.",
};

export default function WardrobePage() {
  return (
    <Suspense>
      <ProductListing title="Wardrobe" />
    </Suspense>
  );
}

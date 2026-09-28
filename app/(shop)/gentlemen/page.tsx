import { Suspense } from "react";
import type { Metadata } from "next";
import ProductListing from "@/app/components/shop/ProductListing";

export const metadata: Metadata = {
  title: "Gentlemen | ZZEIM® Fashion",
  description: "Clean lines and considered fits for gentlemen.",
};

export default function GentlemenPage() {
  return (
    <Suspense>
      <ProductListing gender="gentlemen" title="Gentlemen" />
    </Suspense>
  );
}

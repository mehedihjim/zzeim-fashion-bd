import { Suspense } from "react";
import type { Metadata } from "next";
import ProductListing from "@/app/components/shop/ProductListing";

export const metadata: Metadata = {
  title: "Ladies | ZZEIM® Fashion",
  description: "Sharp tailoring and soft silhouettes for ladies.",
};

export default function LadiesPage() {
  return (
    <Suspense>
      <ProductListing gender="ladies" title="Ladies" />
    </Suspense>
  );
}

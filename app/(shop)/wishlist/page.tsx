import WishlistView from "@/app/components/wishlist/WishlistView";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Wishlist | ZZEIM® Fashion" };

export default function WishlistPage() {
  return <WishlistView />;
}

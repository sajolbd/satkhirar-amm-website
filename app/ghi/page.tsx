import type { Metadata } from "next";

import ProductMenuPage from "components/shop/ProductMenuPage";
import { comingSoonPages } from "data/comingSoonPages";

export const metadata: Metadata = {
  title: "ঘি | Satkhirar Amm",
  description: "খাঁটি দেশি ঘি সংগ্রহ ও অর্ডার সেকশন।",
};

export default function GhiPage() {
  return <ProductMenuPage menuSlug="ghi" fallback={comingSoonPages.ghi} />;
}

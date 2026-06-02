import type { Metadata } from "next";

import ProductMenuPage from "components/shop/ProductMenuPage";
import { comingSoonPages } from "data/comingSoonPages";

export const metadata: Metadata = {
  title: "গুড় | Satkhirar Amm",
  description: "গুড় ক্যাটাগরি শীঘ্রই আসছে।",
};

export default function GurPage() {
  return <ProductMenuPage menuSlug="gur" fallback={comingSoonPages.gur} />;
}

import type { Metadata } from "next";

import ProductMenuPage from "components/shop/ProductMenuPage";
import { comingSoonPages } from "data/comingSoonPages";

export const metadata: Metadata = {
  title: "তেল | Satkhirar Amm",
  description: "তেল ক্যাটাগরি শীঘ্রই আসছে।",
};

export default function OilPage() {
  return <ProductMenuPage menuSlug="oil" fallback={comingSoonPages.oil} />;
}

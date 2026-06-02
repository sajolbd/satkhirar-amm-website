import type { Metadata } from "next";

import ProductMenuPage from "components/shop/ProductMenuPage";
import { comingSoonPages } from "data/comingSoonPages";

export const metadata: Metadata = {
  title: "আচার | Satkhirar Amm",
  description: "আচার ক্যাটাগরি শীঘ্রই আসছে।",
};

export default function PicklePage() {
  return <ProductMenuPage menuSlug="pickle" fallback={comingSoonPages.pickle} />;
}

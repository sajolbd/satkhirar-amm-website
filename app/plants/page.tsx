import type { Metadata } from "next";

import ProductMenuPage from "components/shop/ProductMenuPage";
import { comingSoonPages } from "data/comingSoonPages";

export const metadata: Metadata = {
  title: "চারা | Satkhirar Amm",
  description: "চারা ক্যাটাগরি শীঘ্রই আসছে।",
};

export default function PlantsPage() {
  return <ProductMenuPage menuSlug="plants" fallback={comingSoonPages.plants} />;
}

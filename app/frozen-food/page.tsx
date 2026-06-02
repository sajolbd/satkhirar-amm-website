import type { Metadata } from "next";

import ProductMenuPage from "components/shop/ProductMenuPage";
import { comingSoonPages } from "data/comingSoonPages";

export const metadata: Metadata = {
  title: "ফ্রোজেন ফুড | Satkhirar Amm",
  description: "ফ্রোজেন ফুড ক্যাটাগরি শীঘ্রই আসছে।",
};

export default function FrozenFoodPage() {
  return <ProductMenuPage menuSlug="frozen-food" fallback={comingSoonPages["frozen-food"]} />;
}

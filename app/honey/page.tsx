import type { Metadata } from "next";

import ProductMenuPage from "components/shop/ProductMenuPage";
import { comingSoonPages } from "data/comingSoonPages";

export const metadata: Metadata = {
  title: "মধু | Satkhirar Amm",
  description: "মধু ক্যাটাগরি শীঘ্রই আসছে।",
};

export default function HoneyPage() {
  return <ProductMenuPage menuSlug="honey" fallback={comingSoonPages.honey} />;
}

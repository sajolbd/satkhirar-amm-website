import type { Metadata } from "next";

import ComingSoonPage from "components/shared/ComingSoonPage";
import { comingSoonPages } from "data/comingSoonPages";

export const metadata: Metadata = {
  title: "চারা | Satkhirar Amm",
  description: "চারা ক্যাটাগরি শীঘ্রই আসছে।",
};

export default function PlantsPage() {
  return <ComingSoonPage content={comingSoonPages.plants} />;
}

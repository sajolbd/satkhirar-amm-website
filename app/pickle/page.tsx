import type { Metadata } from "next";

import ComingSoonPage from "components/shared/ComingSoonPage";
import { comingSoonPages } from "data/comingSoonPages";

export const metadata: Metadata = {
  title: "আচার | Satkhirar Amm",
  description: "আচার ক্যাটাগরি শীঘ্রই আসছে।",
};

export default function PicklePage() {
  return <ComingSoonPage content={comingSoonPages.pickle} />;
}

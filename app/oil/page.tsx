import type { Metadata } from "next";

import ComingSoonPage from "components/shared/ComingSoonPage";
import { comingSoonPages } from "data/comingSoonPages";

export const metadata: Metadata = {
  title: "তেল | Satkhirar Amm",
  description: "তেল ক্যাটাগরি শীঘ্রই আসছে।",
};

export default function OilPage() {
  return <ComingSoonPage content={comingSoonPages.oil} />;
}

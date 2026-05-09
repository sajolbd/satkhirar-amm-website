import type { Metadata } from "next";

import ComingSoonPage from "components/shared/ComingSoonPage";
import { comingSoonPages } from "data/comingSoonPages";

export const metadata: Metadata = {
  title: "গুড় | Satkhirar Amm",
  description: "গুড় ক্যাটাগরি শীঘ্রই আসছে।",
};

export default function GurPage() {
  return <ComingSoonPage content={comingSoonPages.gur} />;
}

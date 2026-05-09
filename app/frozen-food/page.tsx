import type { Metadata } from "next";

import ComingSoonPage from "components/shared/ComingSoonPage";
import { comingSoonPages } from "data/comingSoonPages";

export const metadata: Metadata = {
  title: "ফ্রোজেন ফুড | Satkhirar Amm",
  description: "ফ্রোজেন ফুড ক্যাটাগরি শীঘ্রই আসছে।",
};

export default function FrozenFoodPage() {
  return <ComingSoonPage content={comingSoonPages["frozen-food"]} />;
}

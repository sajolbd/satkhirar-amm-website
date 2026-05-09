import type { Metadata } from "next";

import ComingSoonPage from "components/shared/ComingSoonPage";
import { comingSoonPages } from "data/comingSoonPages";

export const metadata: Metadata = {
  title: "মধু | Satkhirar Amm",
  description: "মধু ক্যাটাগরি শীঘ্রই আসছে।",
};

export default function HoneyPage() {
  return <ComingSoonPage content={comingSoonPages.honey} />;
}

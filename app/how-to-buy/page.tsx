import type { Metadata } from "next";

import InfoPage from "components/shared/InfoPage";
import { footerPages } from "data/footerPages";

export const metadata: Metadata = {
  title: "কিভাবে কিনবেন | Satkhirar Amm",
  description: "সাতক্ষীরার আম থেকে কিভাবে পণ্য অর্ডার ও কিনবেন তার বিস্তারিত নির্দেশনা।",
};

export default function HowToBuyPage() {
  return <InfoPage content={footerPages["how-to-buy"]} />;
}

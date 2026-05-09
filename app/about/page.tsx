import type { Metadata } from "next";

import InfoPage from "components/shared/InfoPage";
import { footerPages } from "data/footerPages";

export const metadata: Metadata = {
  title: "আমাদের সম্পর্কে | Satkhirar Amm",
  description: "সাতক্ষীরার আম প্রতিষ্ঠানের পরিচিতি, লক্ষ্য, মূল্যবোধ ও ভবিষ্যৎ পরিকল্পনা।",
};

export default function AboutPage() {
  return <InfoPage content={footerPages.about} />;
}

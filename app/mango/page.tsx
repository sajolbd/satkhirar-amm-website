import type { Metadata } from "next";

import MangoCategoryIntro from "components/home/MangoCategoryIntro";
import PopularMangoesSection from "components/home/PopularMangoesSection";

export const metadata: Metadata = {
  title: "আম | Satkhirar Amm",
  description: "সাতক্ষীরার জনপ্রিয় আমের বাছাইকৃত সংগ্রহ ও অর্ডার সেকশন।",
};

export default function MangoPage() {
  return (
    <>
      <MangoCategoryIntro />
      <PopularMangoesSection />
    </>
  );
}

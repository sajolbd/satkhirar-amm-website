import type { Metadata } from "next";

import InfoPage from "components/shared/InfoPage";
import { footerPages } from "data/footerPages";

export const metadata: Metadata = {
  title: "প্রাইভেসি পলিসি | Satkhirar Amm",
  description: "গ্রাহকের তথ্য সংগ্রহ, ব্যবহার ও সুরক্ষা বিষয়ে সাতক্ষীরার আম-এর নীতিমালা।",
};

export default function PrivacyPolicyPage() {
  return <InfoPage content={footerPages["privacy-policy"]} />;
}

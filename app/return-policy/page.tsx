import type { Metadata } from "next";

import InfoPage from "components/shared/InfoPage";
import { footerPages } from "data/footerPages";

export const metadata: Metadata = {
  title: "ফেরত নীতি | Satkhirar Amm",
  description: "রিটার্ন, অভিযোগ গ্রহণ এবং সমাধান প্রক্রিয়া সম্পর্কে বিস্তারিত তথ্য।",
};

export default function ReturnPolicyPage() {
  return <InfoPage content={footerPages["return-policy"]} />;
}

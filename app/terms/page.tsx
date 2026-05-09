import type { Metadata } from "next";

import InfoPage from "components/shared/InfoPage";
import { footerPages } from "data/footerPages";

export const metadata: Metadata = {
  title: "শর্ত সমূহ | Satkhirar Amm",
  description: "ওয়েবসাইট ব্যবহার, অর্ডার এবং সেবা গ্রহণের ক্ষেত্রে প্রযোজ্য শর্তাবলি।",
};

export default function TermsPage() {
  return <InfoPage content={footerPages.terms} />;
}

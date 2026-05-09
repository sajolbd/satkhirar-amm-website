import type { Metadata } from "next";

import InfoPage from "components/shared/InfoPage";
import { footerPages } from "data/footerPages";

export const metadata: Metadata = {
  title: "যোগাযোগ | Satkhirar Amm",
  description: "সাতক্ষীরার আম-এর সাথে অর্ডার, সহায়তা বা অভিযোগের জন্য যোগাযোগের তথ্য।",
};

export default function ContactPage() {
  return <InfoPage content={footerPages.contact} />;
}

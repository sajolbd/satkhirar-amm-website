import Image from "next/image";
import Link from "next/link";
import {
  Facebook,
  Instagram,
  Twitter,
  Youtube,
  Headphones,
} from "lucide-react";

import Container from "components/shared/Container";

const footerLinks = [
  {
    title: "ইনফরমেশন",
    links: [
      {
        label: "কিভাবে কিনবেন",
        href: "/how-to-buy",
      },
      {
        label: "আমাদের সম্পর্কে",
        href: "/about",
      },
      {
        label: "যোগাযোগ",
        href: "/contact",
      },
      {
        label: "প্রাইভেসি পলিসি",
        href: "/privacy-policy",
      },
      {
        label: "শর্ত সমূহ",
        href: "/terms",
      },
      {
        label: "ফেরত নীতি",
        href: "/return-policy",
      },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="bg-[#fff1e8] text-[#7c2d12]">
      <Container>
        <div className="grid gap-8 py-10 text-center lg:grid-cols-[1.15fr_0.95fr_0.9fr_auto] lg:text-left">
          <div className="mx-auto w-full lg:mx-0">
            <Link href="/" className="mb-4 inline-block">
              <Image
                src="/images/logo.png"
                alt="Satkhirar Aam"
                width={110}
                height={110}
                className="mx-auto h-auto w-[96px] lg:mx-0"
              />
            </Link>

            <h3 className="mb-3 text-[24px] font-bold leading-none">
              আমাদের সম্পর্কে
            </h3>

            <p className="mx-auto max-w-[420px] text-[15px] leading-[1.75] text-[#9a3412] lg:mx-0">
              সাতক্ষীরার আম ২০২২ সালে সাতক্ষীরা থেকে যাত্রা শুরু করে। আমাদের
              প্রাথমিক উদ্দেশ্য হল গাছের নিরাপদ খাবার দেশ ও বিদেশের গ্রাহকদের
              কাছে পৌঁছে দেওয়া।
              <br />
              <br />
              গত ৪ বছরে আমরা সাতক্ষীরা থেকে সারা বাংলাদেশে হাজার হাজার কেজি আম,
              ফরমালিন-মুক্ত পৌঁছে দিয়েছি।
            </p>

            <div className="mt-6 flex flex-wrap items-center justify-center gap-3 lg:justify-start">
              <Link
                href="#"
                className="flex h-11 w-11 items-center justify-center rounded-md bg-white text-primary shadow-sm transition hover:-translate-y-1"
              >
                <Youtube className="h-5 w-5" />
              </Link>

              <Link
                href="#"
                className="flex h-11 w-11 items-center justify-center rounded-md bg-white text-primary shadow-sm transition hover:-translate-y-1"
              >
                <Twitter className="h-5 w-5" />
              </Link>

              <Link
                href="#"
                className="flex h-11 w-11 items-center justify-center rounded-md bg-white text-primary shadow-sm transition hover:-translate-y-1"
              >
                <Facebook className="h-5 w-5" />
              </Link>

              <Link
                href="#"
                className="flex h-11 w-11 items-center justify-center rounded-md bg-white text-primary shadow-sm transition hover:-translate-y-1"
              >
                <Instagram className="h-5 w-5" />
              </Link>
            </div>
          </div>

          <div className="mx-auto w-full lg:mx-0">
            <h3 className="mb-5 text-[24px] font-bold">আমাদের ঠিকানা</h3>

            <div className="space-y-4 text-[15px] leading-[1.75] text-[#9a3412]">
              <p>
                ওয়্যার হাউজঃ নলতা শরীফ,
                <br />
                পোস্টঃ নলতা মোবারক নগর
              </p>

              <p>
                উপজেলাঃ কালীগঞ্জ
                <br />
                জেলাঃ সাতক্ষীরা
              </p>

              <p>
                মোবাইলঃ{" "}
                <Link
                  href="tel:+8801779024048"
                  className="font-semibold transition-colors hover:text-primary"
                >
                  +৮৮০১৭৭৯০২৪০৪৮
                </Link>
              </p>

              <p className="font-semibold text-[#7c2d12]">
                Email:{" "}
                <Link
                  href="mailto:sajolibn@gmail.com"
                  className="transition-colors hover:text-primary"
                >
                  sajolibn@gmail.com
                </Link>
              </p>
            </div>
          </div>

          <div className="mx-auto w-full lg:mx-0">
            {footerLinks.map((section) => (
              <div key={section.title}>
                <h3 className="mb-5 text-[24px] font-bold">{section.title}</h3>

                <div className="flex flex-col gap-3">
                  {section.links.map((link) => (
                    <Link
                      key={link.label}
                      href={link.href}
                      className="text-[15px] text-[#9a3412] transition hover:translate-x-1 hover:text-primary"
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="flex flex-col items-center gap-6 lg:items-start">
            <div className="flex flex-wrap items-center justify-center gap-4 lg:justify-start">
              <div className="flex items-center gap-3">
                <Headphones className="h-6 w-6" />

                <Link
                  href="tel:+8801779024048"
                  className="text-[18px] font-semibold transition-colors hover:text-primary"
                >
                  +৮৮০১৭৭৯০২৪০৪৮
                </Link>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </footer>
  );
}

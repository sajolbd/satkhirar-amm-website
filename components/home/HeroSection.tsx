"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { ArrowRight, ShieldCheck, Star, Truck } from "lucide-react";

import Container from "components/shared/Container";

const slides = [
  {
    id: 1,
    image: "/images/hero/mango-slide-1.png",
    badge: "মৌসুমি সেরা সংগ্রহ",
    title: "গাছপাকা সাতক্ষীরার আম এখন ঘরে বসেই অর্ডার করুন",
    description:
      "সতেজ, বাছাইকৃত এবং যত্নে প্যাক করা আম আমরা সরাসরি সংগ্রহ কেন্দ্র থেকে আপনার পরিবারের জন্য পাঠাই। স্বাদ, গন্ধ আর মানে যেন থাকে সাতক্ষীরার আসল ছোঁয়া।",
    accent: "from-[#fff1e8] via-[#fff7f1] to-[#ffe4cc]",
    glow: "bg-[#f97316]",
    label: "মিষ্টতা, সুবাস, আস্থা",
    points: [
      "ফজলি, ল্যাংড়া, হিমসাগরসহ মৌসুমি ভ্যারাইটি",
      "নিরাপদ প্যাকেজিং ও সময়মতো ডেলিভারি",
    ],
  },
  {
    id: 2,
    image: "/images/hero/mango-slide-2.png",
    badge: "পরিবারের জন্য বিশ্বস্ত পছন্দ",
    title: "প্রতিটি অর্ডারে থাকে যত্নশীল বাছাই ও মান নিয়ন্ত্রণ",
    description:
      "আমাদের লক্ষ্য শুধু আম বিক্রি করা নয়, বরং এমন অভিজ্ঞতা দেওয়া যাতে প্রথম অর্ডারের পরও আপনি নিশ্চিন্তে বারবার ফিরে আসেন।",
    accent: "from-[#fff7e8] via-[#fffdf6] to-[#ffe7bf]",
    glow: "bg-[#fb923c]",
    label: "মান যাচাই করে পাঠানো",
    points: [
      "অর্ডার কনফার্মের আগে পরিমাণ ও ডেলিভারি মিলিয়ে নেওয়া হয়",
      "নষ্ট, দেরি বা বিভ্রান্তি কমাতে ধাপে ধাপে প্রসেসিং",
    ],
  },
  {
    id: 3,
    image: "/images/hero/mango-slide-3.png",
    badge: "সাতক্ষীরার স্বাদের গল্প",
    title: "দেশজুড়ে পৌঁছে দিচ্ছি নিরাপদ, সুস্বাদু ও স্মরণীয় আমের স্বাদ",
    description:
      "উপহার, পরিবার বা ব্যবসায়িক চাহিদা, সব ক্ষেত্রেই থাকে আমাদের যত্নশীল সেবা এবং মৌসুমভিত্তিক প্রিমিয়াম সংগ্রহ।",
    accent: "from-[#fff0db] via-[#fff7ee] to-[#ffe8d2]",
    glow: "bg-[#ea580c]",
    label: "উপহারের মতো সুন্দর প্যাকেজিং",
    points: [
      "বাংলাদেশের বিভিন্ন জেলায় কুরিয়ার সুবিধা",
      "বড় অর্ডার ও উপহার প্যাকের আলাদা সমন্বয়",
    ],
  },
];

const trustPoints = [
  {
    icon: ShieldCheck,
    title: "নির্ভরযোগ্য মান",
    text: "বাছাইকৃত ও যত্নে প্যাক করা পণ্য",
  },
  {
    icon: Truck,
    title: "দ্রুত ডেলিভারি",
    text: "অর্ডার কনফার্মের পর দ্রুত পাঠানো হয়",
  },
  {
    icon: Star,
    title: "গ্রাহকের আস্থা",
    text: "পুনরায় অর্ডার করেন এমন ক্রেতাই আমাদের শক্তি",
  },
];

export default function HeroSection() {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % slides.length);
    }, 4500);

    return () => window.clearInterval(interval);
  }, []);

  return (
    <section className="relative overflow-hidden bg-[radial-gradient(circle_at_top_left,_rgba(249,115,22,0.16),_transparent_32%),linear-gradient(180deg,#fff8f3_0%,#fff4eb_100%)] pb-12 pt-8 sm:pb-16 sm:pt-10 lg:pb-20 lg:pt-14">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-40 bg-[radial-gradient(circle_at_top,_rgba(251,146,60,0.16),_transparent_65%)]" />

      <Container>
        <div className="grid items-center gap-8 lg:grid-cols-[1.02fr_0.98fr] lg:gap-12">
          <div className="relative z-10 order-2 lg:order-1">
            <span className="inline-flex rounded-full border border-[#fdba74] bg-white/90 px-3 py-2 text-[11px] font-semibold tracking-[0.16em] text-primary shadow-sm sm:px-4 sm:text-sm sm:tracking-[0.18em]">
              সাতক্ষীরার মৌসুমি আমের আস্থা
            </span>

            <h1 className="mt-4 max-w-3xl text-[36px] font-bold leading-[1.04] text-[#7c2d12] sm:text-[44px] lg:text-5xl xl:text-6xl">
              পরিবারের টেবিলে পৌঁছে দিন
              <span className="block text-primary">আসল সাতক্ষীরার আমের স্বাদ</span>
            </h1>

            <p className="mt-4 max-w-2xl text-[15px] leading-7 text-[#9a3412] sm:text-[17px] sm:leading-8 lg:text-lg">
              মৌসুমের সেরা আম বাছাই করে, নিরাপদভাবে প্যাক করে এবং বিশ্বস্ত
              ডেলিভারির মাধ্যমে আমরা আপনার ঘরে পৌঁছে দিই। উপহার, পরিবার বা
              ব্যবসায়িক চাহিদা, সব ক্ষেত্রেই থাকে আমাদের যত্নশীল সেবা।
            </p>

            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/mango"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-primary px-6 py-3.5 text-base font-semibold text-white transition-transform hover:-translate-y-0.5 hover:bg-[#ea580c] sm:px-7"
              >
                আজই আম দেখুন
                <ArrowRight className="h-5 w-5" />
              </Link>

              <Link
                href="/contact"
                className="inline-flex items-center justify-center rounded-full border border-[#fdba74] bg-white px-6 py-3.5 text-base font-semibold text-[#7c2d12] transition-colors hover:border-primary hover:text-primary sm:px-7"
              >
                যোগাযোগ করুন
              </Link>
            </div>

            <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {trustPoints.map((point) => {
                const Icon = point.icon;

                return (
                  <div
                    key={point.title}
                    className="rounded-[22px] border border-[#ffddb8] bg-white/90 p-4 shadow-[0_14px_35px_rgba(249,115,22,0.08)]"
                  >
                    <div className="mb-3 inline-flex rounded-2xl bg-[#fff1e8] p-3 text-primary">
                      <Icon className="h-5 w-5" />
                    </div>
                    <h2 className="text-lg font-semibold text-[#7c2d12]">
                      {point.title}
                    </h2>
                    <p className="mt-2 text-sm leading-6 text-[#9a3412]">
                      {point.text}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="relative order-1 lg:order-2">
            <div className="absolute -left-2 -top-2 h-20 w-20 rounded-full bg-[#fdba74]/35 blur-2xl sm:-left-6 sm:-top-6 sm:h-28 sm:w-28" />
            <div className="absolute -bottom-6 -right-2 h-28 w-28 rounded-full bg-[#fb923c]/25 blur-3xl sm:-bottom-8 sm:-right-4 sm:h-36 sm:w-36" />

            <div className="relative overflow-hidden rounded-[28px] border border-[#fed7aa] bg-white p-3 shadow-[0_25px_80px_rgba(124,45,18,0.12)] sm:rounded-[32px] sm:p-5">
              <div className="relative h-[360px] overflow-hidden rounded-[24px] bg-[#fff7f1] sm:h-[460px] sm:rounded-[26px]">
                {slides.map((slide, index) => (
                  <div
                    key={slide.id}
                    className={`absolute inset-0 transition-all duration-700 ${
                      index === activeIndex
                        ? "translate-x-0 opacity-100"
                        : index < activeIndex
                          ? "-translate-x-8 opacity-0"
                          : "translate-x-8 opacity-0"
                    }`}
                  >
                    <div
                      className={`flex h-full flex-col justify-between bg-gradient-to-br ${slide.accent} p-4 sm:p-6 lg:p-8`}
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <span className="inline-flex rounded-full bg-white/90 px-3 py-1.5 text-[10px] font-semibold tracking-[0.18em] text-primary shadow-sm sm:px-4 sm:py-2 sm:text-xs sm:tracking-[0.2em]">
                            {slide.badge}
                          </span>
                          <h2 className="mt-4 max-w-md text-xl font-bold leading-tight text-[#7c2d12] sm:mt-5 sm:text-3xl">
                            {slide.title}
                          </h2>
                        </div>

                        <div
                          className={`hidden h-20 w-20 rounded-full ${slide.glow} opacity-15 blur-2xl sm:block`}
                        />
                      </div>

                      <div className="relative mx-auto flex w-full max-w-[340px] items-center justify-center">
                        <div className="absolute inset-x-8 bottom-5 h-10 rounded-full bg-[#7c2d12]/10 blur-xl" />
                        <div className="relative flex h-[190px] w-full items-center justify-center rounded-[26px] border border-white/70 bg-white/85 p-4 shadow-[0_20px_50px_rgba(124,45,18,0.12)] sm:h-[250px] sm:rounded-[30px] sm:p-6">
                          <div className="absolute left-3 top-3 z-10 rounded-full bg-[#fff1e8] px-3 py-1 text-[10px] font-semibold text-primary sm:left-4 sm:top-4 sm:text-xs">
                            {slide.label}
                          </div>
                          <div className="absolute bottom-3 right-3 z-10 rounded-2xl bg-[#7c2d12] px-3 py-1.5 text-[10px] font-medium text-white sm:bottom-4 sm:right-4 sm:px-4 sm:py-2 sm:text-xs">
                            মৌসুমের প্রিয় পছন্দ
                          </div>
                          <div className="absolute left-6 top-14 h-16 w-16 rounded-full bg-[#fdba74]/40 blur-xl" />
                          <div className="absolute right-6 top-16 h-20 w-20 rounded-full bg-[#fb923c]/30 blur-2xl" />
                          <div className="absolute left-10 bottom-10 h-14 w-14 rounded-full bg-[#f97316]/20 blur-xl" />

                          <div className="relative h-full w-full overflow-hidden rounded-[22px] border border-dashed border-[#fed7aa] bg-[linear-gradient(135deg,rgba(255,241,232,0.9),rgba(255,255,255,0.96))] sm:rounded-[26px]">
                            <Image
                              src={slide.image}
                              alt={slide.title}
                              fill
                              sizes="(min-width: 640px) 320px, 100vw"
                              className="object-cover"
                              priority
                            />
                          </div>
                        </div>
                      </div>

                      <div className="grid gap-2 sm:gap-3">
                        {slide.points.map((point) => (
                          <div
                            key={point}
                            className="rounded-2xl bg-white/85 px-4 py-3 text-xs leading-5 text-[#9a3412] shadow-sm sm:text-sm sm:leading-6"
                          >
                            {point}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-4 rounded-[24px] border border-[#fed7aa] bg-white/90 p-4 shadow-[0_16px_40px_rgba(249,115,22,0.08)] sm:mt-5 sm:rounded-[26px] sm:p-5">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-xs font-semibold tracking-[0.18em] text-primary sm:text-sm sm:tracking-[0.2em]">
                    মৌসুমী অর্ডার আপডেট
                  </p>
                  <p className="mt-2 text-sm leading-6 text-[#9a3412] sm:text-[16px] sm:leading-7">
                    আমের মৌসুমে প্রতিদিন নতুন চালান, বাছাইকৃত ফল এবং অর্ডার
                    অনুযায়ী দ্রুত প্রসেসিংয়ের সুবিধা রাখা হয়।
                  </p>
                </div>

                <div className="rounded-2xl bg-[#fff1e8] px-5 py-4 text-center">
                  <p className="text-3xl font-bold text-[#7c2d12]">৫০০+</p>
                  <p className="mt-1 text-sm text-[#9a3412]">
                    সন্তুষ্ট গ্রাহকের আস্থা
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

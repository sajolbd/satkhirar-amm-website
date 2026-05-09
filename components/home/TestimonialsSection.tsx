"use client";

import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, Quote, Star } from "lucide-react";

import Container from "components/shared/Container";

const testimonials = [
  {
    id: 1,
    name: "সাবিহা রহমান",
    location: "ধানমন্ডি, ঢাকা",
    title: "স্বাদে একদম আসল আর খুবই টাটকা",
    message:
      "প্রথমবার অর্ডার করেছিলাম একটু দ্বিধা নিয়ে, কিন্তু আম হাতে পাওয়ার পর সত্যিই মুগ্ধ হয়েছি। প্যাকেজিং খুব সুন্দর ছিল, আর আমগুলো ছিল একদম পাকা, মিষ্টি ও সুগন্ধি। পরিবারের সবাই খুব পছন্দ করেছে।",
  },
  {
    id: 2,
    name: "রাশেদুল ইসলাম",
    location: "খুলনা সদর",
    title: "ডেলিভারি দ্রুত, মানও দারুণ",
    message:
      "আমাদের এলাকায় অনলাইন থেকে ফল অর্ডার করলে অনেক সময় মান নিয়ে ভয় থাকে। কিন্তু সাতক্ষীরার আম সময়মতো পৌঁছে দিয়েছে এবং প্রতিটি আম যথেষ্ট ভালো ছিল। আবারও অর্ডার করার ইচ্ছা আছে।",
  },
  {
    id: 3,
    name: "ফারহানা কবির",
    location: "চট্টগ্রাম",
    title: "উপহার দেওয়ার জন্যও পারফেক্ট",
    message:
      "আত্মীয়দের বাসায় পাঠানোর জন্য আম নিয়েছিলাম। শুধু ফল না, পুরো presentation-টাই classy ছিল। যারা পেয়েছেন সবাই বলেছে আমের স্বাদ খুবই ভালো, আর packaging দেখে বোঝা গেছে যত্ন নিয়ে পাঠানো হয়েছে।",
  },
  {
    id: 4,
    name: "মাহমুদ হাসান",
    location: "রাজশাহী",
    title: "যেমন বলেছিল, ঠিক তেমনই পেয়েছি",
    message:
      "অনেকেই পণ্যের description-এ একরকম লেখে, পরে অন্যরকম জিনিস দেয়। এখানে সেটা হয়নি। variety, weight, ripeness সবকিছু মিলেছে। customer support-ও খুব ভদ্রভাবে handle করেছে।",
  },
  {
    id: 5,
    name: "নুসরাত জাহান",
    location: "মিরপুর, ঢাকা",
    title: "রিপিট অর্ডার করার মতো সার্ভিস",
    message:
      "আমার বাচ্চারা খুব picky eater, কিন্তু এই আম তারা খুব পছন্দ করেছে। নরম, মিষ্টি আর একদম fresh ছিল। সবচেয়ে ভালো লেগেছে যে অর্ডারের আগে confirm করে নিয়েছে, তাই ভুল হওয়ার সুযোগ ছিল না।",
  },
];

export default function TestimonialsSection() {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % testimonials.length);
    }, 4200);

    return () => window.clearInterval(interval);
  }, []);

  const previous = () => {
    setActiveIndex((current) => (current - 1 + testimonials.length) % testimonials.length);
  };

  const next = () => {
    setActiveIndex((current) => (current + 1) % testimonials.length);
  };

  return (
    <section className="bg-[#fffaf6] py-12 sm:py-16 lg:py-20">
      <Container>
        <div className="rounded-[28px] border border-[#fed7aa] bg-white p-4 shadow-[0_24px_70px_rgba(249,115,22,0.08)] sm:rounded-[34px] sm:p-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div className="max-w-3xl">
              <p className="inline-flex rounded-full bg-[#fff1e8] px-4 py-2 text-[11px] font-semibold tracking-[0.16em] text-primary sm:text-sm sm:tracking-[0.18em]">
                কাস্টমারদের মতামত
              </p>
              <h2 className="mt-4 text-[28px] font-bold leading-tight text-[#7c2d12] sm:text-4xl">
                যারা আমাদের আম নিয়েছেন,
                <span className="block text-primary">
                  তাদের মুখে শোনা কিছু সত্যিকারের অভিজ্ঞতা
                </span>
              </h2>
              <p className="mt-4 text-[15px] leading-7 text-[#9a3412] sm:text-[17px] sm:leading-8">
                পুনরায় অর্ডার করা গ্রাহক, উপহার পাঠানো পরিবার, আর মৌসুমি
                ক্রেতাদের feedback থেকেই আমরা বুঝি আমাদের সেবা কতটা meaningful।
              </p>
            </div>

            <div className="hidden items-center gap-3 sm:flex">
              <button
                type="button"
                onClick={previous}
                className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-[#fdba74] bg-white text-[#7c2d12] transition hover:border-primary hover:text-primary"
                aria-label="Previous testimonial"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button
                type="button"
                onClick={next}
                className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-[#fdba74] bg-white text-[#7c2d12] transition hover:border-primary hover:text-primary"
                aria-label="Next testimonial"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
          </div>

          <div className="mt-8 grid gap-4 lg:grid-cols-[1.2fr_0.8fr] lg:gap-5">
            <div className="relative overflow-hidden rounded-[24px] border border-[#fed7aa] bg-[linear-gradient(135deg,#fff7f1,#fff1e8)] p-5 shadow-sm sm:rounded-[30px] sm:p-7">
              <Quote className="h-12 w-12 text-primary/30" />

              <div className="mt-5 overflow-hidden">
                <div
                  className="flex transition-transform duration-500 ease-out"
                  style={{ transform: `translateX(-${activeIndex * 100}%)` }}
                >
                  {testimonials.map((item) => (
                    <article key={item.id} className="w-full shrink-0 pr-1">
                      <div className="flex items-center gap-1 text-[#ffb703]">
                        {Array.from({ length: 5 }).map((_, index) => (
                          <Star
                            key={`${item.id}-${index}`}
                            className="h-5 w-5 fill-current"
                          />
                        ))}
                      </div>

                      <h3 className="mt-5 text-[22px] font-bold leading-tight text-[#7c2d12] sm:text-[30px]">
                        {item.title}
                      </h3>
                      <p className="mt-5 text-[15px] leading-7 text-[#9a3412] sm:text-[17px] sm:leading-8">
                        {item.message}
                      </p>
                      <div className="mt-8">
                        <p className="text-lg font-bold text-[#7c2d12]">
                          {item.name}
                        </p>
                        <p className="mt-1 text-sm font-medium text-primary">
                          {item.location}
                        </p>
                      </div>
                    </article>
                  ))}
                </div>
              </div>
            </div>

            <div className="grid gap-3 sm:gap-4">
              {testimonials.map((item, index) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setActiveIndex(index)}
                  className={`rounded-[20px] border px-4 py-4 text-left transition sm:rounded-[24px] sm:px-5 sm:py-5 ${
                    index === activeIndex
                      ? "border-primary bg-[#fff1e8] shadow-[0_12px_30px_rgba(249,115,22,0.12)]"
                      : "border-[#fed7aa] bg-white hover:border-[#fdba74]"
                  }`}
                >
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <p className="text-base font-bold text-[#7c2d12] sm:text-lg">
                        {item.name}
                      </p>
                      <p className="mt-1 text-sm text-[#9a3412]">
                        {item.location}
                      </p>
                    </div>
                    <span className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-primary">
                      ৫/৫
                    </span>
                  </div>
                  <p className="mt-3 line-clamp-2 text-sm leading-6 text-[#9a3412] sm:leading-7">
                    {item.message}
                  </p>
                </button>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

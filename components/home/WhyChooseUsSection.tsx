"use client";

import {
  BadgeCheck,
  CreditCard,
  Droplets,
  SmilePlus,
  Truck,
} from "lucide-react";

import Container from "components/shared/Container";

const benefits = [
  {
    icon: Droplets,
    title: "ফরমালিন মুক্ত আম!",
    text: "নিরাপদ, যত্নে বাছাইকৃত এবং পরিবারের জন্য নিশ্চিন্ত পছন্দ।",
  },
  {
    icon: SmilePlus,
    title: "আসল জাত, আসল স্বাদ!",
    text: "স্বাদ, সুবাস আর মানে সাতক্ষীরার আসল অভিজ্ঞতা পৌঁছে দিই।",
  },
  {
    icon: CreditCard,
    title: "সহজ ও সেইফ পেমেন্ট",
    text: "অর্ডার কনফার্মেশনের আগে তথ্য যাচাই, তারপর স্বচ্ছ পেমেন্ট প্রসেস।",
  },
  {
    icon: Truck,
    title: "দ্রুত ডেলিভারি!",
    text: "সময়ের মধ্যে পাঠানো, যত্নে প্যাকিং এবং নির্ভরযোগ্য কুরিয়ার সাপোর্ট।",
  },
];

export default function WhyChooseUsSection() {
  return (
    <section className="bg-[#fffaf6] pb-12 sm:pb-16 lg:pb-20">
      <Container>
        <div className="rounded-[24px] border border-[#fee2c7] bg-white px-4 py-4 shadow-[0_16px_50px_rgba(249,115,22,0.06)] sm:rounded-[30px] sm:px-6 sm:py-6 lg:px-8">
          <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4 xl:gap-0">
            {benefits.map((benefit, index) => {
              const Icon = benefit.icon;

              return (
                <div
                  key={benefit.title}
                  className={`flex items-start gap-4 rounded-[20px] px-3 py-4 sm:items-center sm:rounded-[24px] sm:px-5 xl:min-h-[170px] xl:rounded-none xl:px-6 ${
                    index !== benefits.length - 1
                      ? "xl:border-r xl:border-[#efd7c4]"
                      : ""
                  }`}
                >
                  <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-[18px] bg-[#fff1e8] text-primary shadow-sm sm:h-16 sm:w-16 sm:rounded-[20px]">
                    {index === 0 ? (
                      <div className="relative">
                        <Icon className="h-7 w-7 sm:h-8 sm:w-8" />
                        <BadgeCheck className="absolute -bottom-2 -right-2 h-5 w-5 rounded-full bg-white text-[#0ea5e9]" />
                      </div>
                    ) : (
                      <Icon className="h-7 w-7 sm:h-8 sm:w-8" />
                    )}
                  </div>

                  <div>
                    <h2 className="text-[20px] font-bold leading-tight text-[#7c2d12] sm:text-[22px]">
                      {benefit.title}
                    </h2>
                    <p className="mt-2 text-sm leading-6 text-[#9a3412] sm:leading-7">
                      {benefit.text}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </Container>
    </section>
  );
}

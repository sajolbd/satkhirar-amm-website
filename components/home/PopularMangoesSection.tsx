"use client";

import Image from "next/image";
import { ShoppingBag } from "lucide-react";

import Container from "components/shared/Container";
import { useShop } from "components/shop/ShopContext";

const COMING_SOON_STATUS = "শীঘ্রই আসছে";

export default function PopularMangoesSection() {
  const { addToCart, openAuth, products } = useShop();

  return (
    <section className="bg-[#fffaf6] py-12 sm:py-16 lg:py-20">
      <Container>
        <div className="rounded-[28px] border border-[#fed7aa] bg-white p-4 shadow-[0_24px_70px_rgba(249,115,22,0.08)] sm:rounded-[34px] sm:p-8">
          <div className="max-w-3xl">
            <p className="inline-flex rounded-full bg-[#fff1e8] px-4 py-2 text-[11px] font-semibold tracking-[0.16em] text-primary sm:text-sm sm:tracking-[0.18em]">
              সাতক্ষীরার জনপ্রিয় আম বিশ্লেষণ
            </p>
            <h2 className="mt-4 text-[28px] font-bold leading-tight text-[#7c2d12] sm:text-4xl">
              ক্রেতাদের পছন্দ, স্বাদ, গন্ধ আর ব্যবহারভিত্তিক
              <span className="block text-primary">
                আমাদের সবচেয়ে জনপ্রিয় আমের সংগ্রহ
              </span>
            </h2>
            <p className="mt-4 text-[15px] leading-7 text-[#9a3412] sm:text-[17px] sm:leading-8">
              সাতক্ষীরার ক্রেতাদের অর্ডার প্যাটার্ন, স্বাদের পছন্দ, পরিবারের
              ব্যবহার আর উপহার দেওয়ার ট্রেন্ড দেখে এই সংগ্রহ সাজানো হয়েছে। যে
              ভ্যারাইটিগুলো নিয়মিত রিপিট অর্ডার পায়, সেগুলোকেই আমরা এখানে
              সুন্দরভাবে উপস্থাপন করেছি।
            </p>
          </div>

          <div className="mt-8 grid gap-4 sm:gap-5 md:grid-cols-2 xl:grid-cols-5">
            {products.map((product) => {
              const isComingSoon = product.status === COMING_SOON_STATUS;

              return (
              <article
                id={product.id}
                key={product.id}
                className="group overflow-hidden rounded-[24px] border border-[#fed7aa] bg-white shadow-[0_16px_40px_rgba(124,45,18,0.08)] transition-transform hover:-translate-y-1 sm:rounded-[26px]"
              >
                <div className={`px-4 py-3 text-center text-sm font-semibold text-white ${isComingSoon ? "bg-[#7c2d12]" : "bg-[linear-gradient(135deg,#fb923c,#f97316)]"}`}>
                  {isComingSoon ? COMING_SOON_STATUS : product.discountLabel}
                </div>

                <div className="p-4">
                  <div className="relative h-52 overflow-hidden rounded-[20px] bg-[#fff7f1] sm:h-48 sm:rounded-[22px]">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      sizes="(min-width: 1280px) 220px, (min-width: 768px) 45vw, 100vw"
                      className={`object-cover transition-transform duration-500 group-hover:scale-105 ${isComingSoon ? "grayscale" : ""}`}
                    />
                  </div>

                  <div className="mt-5 text-center">
                    <h3 className="text-[20px] font-bold leading-tight text-[#7c2d12] sm:text-[22px]">
                      {product.name}
                    </h3>
                    <p className="mt-3 text-[14px] leading-6 text-[#9a3412] sm:text-[15px] sm:leading-7">
                      {product.variety}
                    </p>
                    <p className="mt-2 text-sm font-medium text-primary">
                      {product.unit}
                    </p>
                    <p className="mt-3 text-2xl font-bold text-[#7c2d12]">
                      {product.price.toLocaleString("bn-BD")} টাকা
                    </p>
                    <p className="mt-3 text-sm leading-6 text-[#9a3412] sm:leading-7">
                      {product.shortNote}
                    </p>
                  </div>

                  <button
                    type="button"
                    disabled={isComingSoon}
                    onClick={() => {
                      const result = addToCart(product);
                      if (result.requiresAuth) {
                        openAuth("signin");
                      }
                    }}
                    className={`mt-6 flex w-full items-center justify-center gap-2 rounded-2xl px-4 py-3 font-semibold text-white transition ${isComingSoon ? "cursor-not-allowed bg-[#7c2d12]/70" : "bg-[#ffb703] hover:bg-[#f59e0b]"}`}
                  >
                    <ShoppingBag className="h-5 w-5" />
                    {isComingSoon ? COMING_SOON_STATUS : "অর্ডার করুন"}
                  </button>
                </div>
              </article>
              );
            })}
          </div>

          <div className="mt-8 rounded-[24px] border border-[#fed7aa] bg-[#fff7f1] px-4 py-5 text-[14px] leading-7 text-[#9a3412] sm:rounded-[28px] sm:px-6 sm:text-[15px] sm:leading-8">
            <span className="mr-3 inline-flex rounded-full bg-primary px-4 py-1.5 text-sm font-semibold text-white">
              বিশেষ পর্যবেক্ষণ
            </span>
            সাতক্ষীরার বাজারে সবচেয়ে বেশি চাহিদা থাকে আঁশবিহীন, সুবাসযুক্ত এবং
            পরিবারভিত্তিক শেয়ার করা যায় এমন আমে। তাই আমরা জনপ্রিয় ভ্যারাইটিগুলো
            এমনভাবে সাজিয়েছি যাতে স্বাদ, বাজেট ও ব্যবহার অনুযায়ী গ্রাহক সহজে
            সিদ্ধান্ত নিতে পারেন।
          </div>
        </div>
      </Container>
    </section>
  );
}

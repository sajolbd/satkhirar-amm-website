"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ShoppingBag } from "lucide-react";

import Container from "components/shared/Container";
import type { Product } from "components/shop/ShopContext";
import { useShop } from "components/shop/ShopContext";

const COMING_SOON_STATUS = "শীঘ্রই আসছে";
const DEFAULT_PRODUCT_IMAGE = "/images/hero/mango-slide-1.png";

const categoryOrder = [
  {
    slug: "mango",
    category: "আম",
    label: "আম",
    title: "সাতক্ষীরার আম",
    href: "/mango",
  },
  {
    slug: "honey",
    category: "মধু",
    label: "মধু",
    title: "প্রাকৃতিক মধু",
    href: "/honey",
  },
  {
    slug: "gur",
    category: "গুড়",
    label: "গুড়",
    title: "খাঁটি গুড়",
    href: "/gur",
  },
  {
    slug: "plants",
    category: "চারা",
    label: "চারা",
    title: "নির্বাচিত চারা",
    href: "/plants",
  },
  {
    slug: "pickle",
    category: "আচার",
    label: "আচার",
    title: "দেশি আচার",
    href: "/pickle",
  },
  {
    slug: "oil",
    category: "তেল",
    label: "তেল",
    title: "মানসম্মত তেল",
    href: "/oil",
  },
  {
    slug: "frozen-food",
    category: "ফ্রোজেন ফুড",
    label: "ফ্রোজেন ফুড",
    title: "ফ্রোজেন ফুড",
    href: "/frozen-food",
  },
];

const categoryAliases: Record<string, string[]> = {
  mango: ["আম"],
  honey: ["মধু"],
  gur: ["গুড়", "গুড়"],
  plants: ["চারা"],
  pickle: ["আচার"],
  oil: ["তেল"],
  "frozen-food": ["ফ্রোজেন ফুড"],
};

function toEnglishDigits(value: string) {
  const digitMap: Record<string, string> = {
    "০": "0",
    "১": "1",
    "২": "2",
    "৩": "3",
    "৪": "4",
    "৫": "5",
    "৬": "6",
    "৭": "7",
    "৮": "8",
    "৯": "9",
  };

  return value.replace(/[০-৯]/g, (digit) => digitMap[digit] ?? digit);
}

function getDiscountLabel(product: Product) {
  const discountAmount = Number(product.discountAmount || 0);
  if (discountAmount > 0) {
    return `${discountAmount.toLocaleString("bn-BD")} টাকা ডিসকাউন্ট`;
  }

  const discountLabel = product.discountLabel?.trim() || "";
  const normalizedLabel = toEnglishDigits(discountLabel);
  const labelAmount = Number(normalizedLabel.replace(/[^\d.]/g, ""));

  if (labelAmount > 0 && /^\d+(\.\d+)?$/.test(normalizedLabel)) {
    return `${labelAmount.toLocaleString("bn-BD")} টাকা ডিসকাউন্ট`;
  }

  return discountLabel;
}

function getCategoryProducts(products: Product[], slug: string, category: string) {
  const aliases = categoryAliases[slug] ?? [category];

  return products.filter((product) => {
    const productMenuSlug = product.menuSlug?.trim().toLowerCase();
    const productCategory = product.category?.trim();

    if (aliases.includes(productCategory || "")) {
      return true;
    }

    if (!productCategory && slug === "mango") {
      return true;
    }

    return productMenuSlug === slug;
  });
}

function ProductCard({ product }: { product: Product }) {
  const { addToCart, openAuth } = useShop();
  const isComingSoon = product.isActive === false;
  const discountLabel = isComingSoon ? COMING_SOON_STATUS : getDiscountLabel(product);

  return (
    <article
      id={product.id}
      className="group overflow-hidden rounded-[24px] border border-[#fed7aa] bg-white shadow-[0_16px_40px_rgba(124,45,18,0.08)] transition-transform hover:-translate-y-1"
    >
      <div
        className={`min-h-[44px] px-4 py-3 text-center text-sm font-semibold text-white ${
          isComingSoon
            ? "bg-[#7c2d12]"
            : "bg-[linear-gradient(135deg,#fb923c,#f97316)]"
        }`}
      >
        {discountLabel}
      </div>

      <div className="p-4">
        <div className="relative h-48 overflow-hidden rounded-[20px] bg-[#fff7f1]">
          <Image
            src={product.image || DEFAULT_PRODUCT_IMAGE}
            alt={product.name}
            fill
            sizes="(min-width: 1280px) 240px, (min-width: 768px) 32vw, 100vw"
            className={`object-cover transition-transform duration-500 group-hover:scale-105 ${
              isComingSoon ? "grayscale" : ""
            }`}
          />
        </div>

        <div className="mt-5 text-center">
          <h3 className="text-[20px] font-bold leading-tight text-[#7c2d12]">
            {product.name}
          </h3>
          <p className="mt-3 text-[14px] leading-6 text-[#9a3412]">
            {product.variety}
          </p>
          <p className="mt-2 text-sm font-medium text-primary">
            {product.unit}
          </p>
          <p className="mt-3 text-2xl font-bold text-[#7c2d12]">
            {product.price.toLocaleString("bn-BD")} টাকা
          </p>
          <p className="mt-3 text-sm leading-6 text-[#9a3412]">
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
          className={`mt-6 flex w-full items-center justify-center gap-2 rounded-2xl px-4 py-3 font-semibold text-white transition ${
            isComingSoon
              ? "cursor-not-allowed bg-[#7c2d12]/70"
              : "bg-[#ffb703] hover:bg-[#f59e0b]"
          }`}
        >
          <ShoppingBag className="h-5 w-5" />
          {isComingSoon ? COMING_SOON_STATUS : "অর্ডার করুন"}
        </button>
      </div>
    </article>
  );
}

export default function HomeProductCategories() {
  const { products } = useShop();
  const visibleCategories = categoryOrder
    .map((category) => ({
      ...category,
      products: getCategoryProducts(products, category.slug, category.category),
    }))
    .filter((category) => category.products.length > 0);

  if (visibleCategories.length === 0) {
    return null;
  }

  return (
    <section className="bg-[#fffaf6] py-12 sm:py-16 lg:py-20">
      <Container>
        <div className="mb-8 max-w-3xl">
          <p className="inline-flex rounded-full bg-[#fff1e8] px-4 py-2 text-[11px] font-semibold tracking-[0.16em] text-primary sm:text-sm sm:tracking-[0.18em]">
            সব পণ্য একসাথে
          </p>
          <h2 className="mt-4 text-[28px] font-bold leading-tight text-[#7c2d12] sm:text-4xl">
            ক্যাটাগরি অনুযায়ী
            <span className="block text-primary">আমাদের নির্বাচিত পণ্য</span>
          </h2>
        </div>

        <div className="space-y-10">
          {visibleCategories.map((category) => (
            <div key={category.slug}>
              <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
                <div>
                  <p className="text-sm font-bold text-primary">
                    {category.label}
                  </p>
                  <h3 className="text-2xl font-bold text-[#7c2d12]">
                    {category.title}
                  </h3>
                </div>
                <Link
                  href={category.href}
                  className="inline-flex items-center gap-2 rounded-full border border-[#fed7aa] bg-white px-4 py-2 text-sm font-bold text-[#7c2d12] transition hover:border-primary hover:text-primary"
                >
                  সব দেখুন
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>

              <div className="grid gap-4 sm:gap-5 md:grid-cols-2 xl:grid-cols-4">
                {category.products.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}

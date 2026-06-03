"use client";

import { useEffect, useState } from "react";

import PopularMangoesSection, {
  type ProductSectionContent,
} from "components/home/PopularMangoesSection";
import ComingSoonPage from "components/shared/ComingSoonPage";
import { apiRequest } from "lib/api";
import type { ComingSoonPageContent } from "data/comingSoonPages";
import type { Product } from "components/shop/ShopContext";

type ProductMenuPageProps = {
  menuSlug: string;
  fallback: ComingSoonPageContent;
};

const menuCategories: Record<string, string> = {
  mango: "আম",
  gur: "গুড়",
  plants: "চারা",
  pickle: "আচার",
  oil: "তেল",
  honey: "মধু",
  "frozen-food": "ফ্রোজেন ফুড",
};

const CLOSED_STATUS = "বন্ধ";

const menuCategoryAliases: Record<string, string[]> = {
  mango: ["আম"],
  gur: ["গুড়", "গুড়"],
  plants: ["চারা"],
  pickle: ["আচার"],
  oil: ["তেল"],
  honey: ["মধু"],
  "frozen-food": ["ফ্রোজেন ফুড"],
};

const menuSectionContent: Record<string, ProductSectionContent> = {
  mango: {
    badge: "সাতক্ষীরার জনপ্রিয় আম বিশ্লেষণ",
    heading: "ক্রেতাদের পছন্দ, স্বাদ, গন্ধ আর ব্যবহারভিত্তিক",
    highlightedHeading: "আমাদের সবচেয়ে জনপ্রিয় আমের সংগ্রহ",
    description:
      "সাতক্ষীরার ক্রেতাদের অর্ডার প্যাটার্ন, স্বাদের পছন্দ, পরিবারের ব্যবহার আর উপহার দেওয়ার ট্রেন্ড দেখে এই সংগ্রহ সাজানো হয়েছে। যে ভ্যারাইটিগুলো নিয়মিত রিপিট অর্ডার পায়, সেগুলোকেই আমরা এখানে সুন্দরভাবে উপস্থাপন করেছি।",
    noteLabel: "বিশেষ পর্যবেক্ষণ",
    note:
      "সাতক্ষীরার বাজারে সবচেয়ে বেশি চাহিদা থাকে আঁশবিহীন, সুবাসযুক্ত এবং পরিবারভিত্তিক শেয়ার করা যায় এমন আমে। তাই আমরা জনপ্রিয় ভ্যারাইটিগুলো এমনভাবে সাজিয়েছি যাতে স্বাদ, বাজেট ও ব্যবহার অনুযায়ী গ্রাহক সহজে সিদ্ধান্ত নিতে পারেন।",
  },
  honey: {
    badge: "প্রাকৃতিক মধুর নির্বাচিত সংগ্রহ",
    heading: "উৎস, ঘনত্ব, স্বাদ আর দৈনন্দিন ব্যবহারভিত্তিক",
    highlightedHeading: "আমাদের মানসম্মত মধুর সংগ্রহ",
    description:
      "পরিবারের দৈনন্দিন ব্যবহার, উপহার, স্বাস্থ্যসচেতন খাবার এবং স্বাদের ধরন বিবেচনা করে এই মধুর সংগ্রহ সাজানো হয়েছে। ফুলের উৎস, ঘ্রাণ, ঘনত্ব এবং প্যাকেজিংয়ের মান দেখে প্রতিটি আইটেম গ্রাহকের জন্য উপস্থাপন করা হচ্ছে।",
    noteLabel: "মধু নির্বাচনের কথা",
    note:
      "মধু কেনার সময় স্বাদ, ঘনত্ব, উৎস এবং সংরক্ষণ পদ্ধতি খুব গুরুত্বপূর্ণ। তাই আমরা এমন মধু রাখছি যেগুলো চা, নাশতা, রান্না, উপহার এবং পরিবারের নিয়মিত ব্যবহারে সহজে মানিয়ে যায়।",
  },
  gur: {
    badge: "দেশি গুড়ের নির্বাচিত সংগ্রহ",
    heading: "ঘ্রাণ, রং, মিষ্টতা আর মৌসুমি মানভিত্তিক",
    highlightedHeading: "আমাদের খাঁটি স্বাদের গুড় সংগ্রহ",
    description:
      "শীতের পিঠা, পায়েস, নাশতা ও দৈনন্দিন রান্নার জন্য মানসম্মত গুড় বাছাই করে এই সংগ্রহ সাজানো হয়েছে। স্বাভাবিক ঘ্রাণ, রং, মিষ্টতা এবং ব্যবহারযোগ্য প্যাকেজিংকে আমরা বিশেষ গুরুত্ব দিচ্ছি।",
    noteLabel: "গুড় নির্বাচনের কথা",
    note:
      "ভালো গুড়ের আসল সৌন্দর্য থাকে তার ঘ্রাণ, স্বাদ এবং প্রাকৃতিক মিষ্টতায়। তাই রান্না, মিষ্টান্ন ও পারিবারিক ব্যবহারের জন্য উপযোগী গুড়গুলো আলাদা করে সাজানো হয়েছে।",
  },
  plants: {
    badge: "বাগানের জন্য নির্বাচিত চারা",
    heading: "ঘর, ছাদবাগান, উপহার আর পরিচর্যাভিত্তিক",
    highlightedHeading: "আমাদের স্বাস্থ্যবান চারার সংগ্রহ",
    description:
      "বাসা, ছাদবাগান, ছোট বাগান বা উপহার দেওয়ার জন্য উপযোগী চারা নিয়ে এই সংগ্রহ তৈরি করা হচ্ছে। সহজ পরিচর্যা, স্বাস্থ্যবান রোপণ উপকরণ এবং ব্যবহারিক প্রয়োজন বিবেচনা করে প্রতিটি চারা সাজানো হয়েছে।",
    noteLabel: "চারা নির্বাচনের কথা",
    note:
      "চারা কেনার সময় গাছের স্বাস্থ্য, পরিবেশের সাথে মানিয়ে নেওয়া এবং পরিচর্যার সহজতা সবচেয়ে গুরুত্বপূর্ণ। তাই নতুন ও অভিজ্ঞ বাগানপ্রেমী সবার জন্য উপযোগী চারা এখানে রাখা হচ্ছে।",
  },
  pickle: {
    badge: "দেশি স্বাদের আচারের সংগ্রহ",
    heading: "ঝাল, মিষ্টি, টক আর ঘরোয়া রেসিপিভিত্তিক",
    highlightedHeading: "আমাদের মজাদার আচারের সংগ্রহ",
    description:
      "দৈনন্দিন খাবারের সঙ্গে মানানসই দেশি আচার, আমের আচার এবং পরিবারের পছন্দের ঘরোয়া স্বাদের আইটেম নিয়ে এই সংগ্রহ সাজানো হয়েছে। স্বাদ, পরিচ্ছন্নতা এবং নিরাপদ প্যাকেজিংকে আমরা গুরুত্ব দিচ্ছি।",
    noteLabel: "আচার নির্বাচনের কথা",
    note:
      "ভালো আচার খাবারের স্বাদ বাড়ায় এবং ঘরোয়া টেবিলে আলাদা আনন্দ যোগ করে। তাই ঝাল, টক, মিষ্টি ও মশলার ভারসাম্য দেখে জনপ্রিয় আচারগুলো সাজানো হয়েছে।",
  },
  oil: {
    badge: "নির্বাচিত তেলের সংগ্রহ",
    heading: "বিশুদ্ধতা, রান্না, ঘ্রাণ আর ব্যবহারভিত্তিক",
    highlightedHeading: "আমাদের মানসম্মত তেলের সংগ্রহ",
    description:
      "রান্না, স্বাস্থ্যসচেতন ব্যবহার এবং পরিবারের নিয়মিত প্রয়োজন বিবেচনা করে নির্বাচিত তেলের সংগ্রহ সাজানো হয়েছে। বিশুদ্ধতা, ঘ্রাণ, প্যাকেজিং এবং সরবরাহের ধারাবাহিকতাকে আমরা গুরুত্ব দিচ্ছি।",
    noteLabel: "তেল নির্বাচনের কথা",
    note:
      "তেল বাছাইয়ের ক্ষেত্রে বিশুদ্ধতা ও ব্যবহারযোগ্যতা সবচেয়ে জরুরি। তাই রান্না, ভাজা, সালাদ বা দৈনন্দিন ব্যবহার অনুযায়ী গ্রাহক যেন সহজে সিদ্ধান্ত নিতে পারেন, সেইভাবে পণ্য সাজানো হয়েছে।",
  },
  "frozen-food": {
    badge: "হোমমেড ফ্রোজেন ফুড সংগ্রহ",
    heading: "স্বাদ, সংরক্ষণ, প্যাকেজিং আর পরিবারভিত্তিক",
    highlightedHeading: "আমাদের সুবিধাজনক ফ্রোজেন ফুড সংগ্রহ",
    description:
      "ব্যস্ত দিনের সহজ রান্না, পরিবারের নাশতা এবং অতিথি আপ্যায়নের কথা মাথায় রেখে ফ্রোজেন ফুড সংগ্রহ সাজানো হচ্ছে। স্বাদ বজায় রাখা, নিরাপদ সংরক্ষণ এবং পরিষ্কার প্যাকেজিংকে আমরা গুরুত্ব দিচ্ছি।",
    noteLabel: "ফ্রোজেন ফুড নির্বাচনের কথা",
    note:
      "ভালো ফ্রোজেন ফুড সময় বাঁচায়, কিন্তু স্বাদ ও নিরাপত্তায় ছাড় দেওয়া যায় না। তাই পরিবার-উপযোগী, সহজে প্রস্তুত করা যায় এমন আইটেমগুলো এই সেকশনে রাখা হচ্ছে।",
  },
};

function getMenuProducts(products: Product[], menuSlug: string) {
  const categories = menuCategoryAliases[menuSlug] ?? [
    menuCategories[menuSlug],
  ];

  return products.filter((product) => {
    const productMenuSlug = product.menuSlug?.trim().toLowerCase();
    const productCategory = product.category?.trim();

    if (categories.includes(productCategory || "")) {
      return true;
    }

    if (!productCategory && menuSlug === "mango") {
      return true;
    }

    return productMenuSlug === menuSlug;
  });
}

export default function ProductMenuPage({ menuSlug, fallback }: ProductMenuPageProps) {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    const loadProducts = async () => {
      try {
        const nextProducts = await apiRequest<Product[]>(
          "/api/products"
        );

        if (isMounted) {
          setProducts(
            getMenuProducts(nextProducts, menuSlug).filter(
              (product) => product.status !== CLOSED_STATUS
            )
          );
        }
      } catch {
        if (isMounted) {
          setProducts([]);
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    void loadProducts();

    return () => {
      isMounted = false;
    };
  }, [menuSlug]);

  if (isLoading || products.length > 0) {
    return (
      <PopularMangoesSection
        products={products}
        content={menuSectionContent[menuSlug]}
      />
    );
  }

  return <ComingSoonPage content={fallback} />;
}

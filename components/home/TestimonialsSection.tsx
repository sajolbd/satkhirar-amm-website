"use client";

import { useEffect, useMemo, useState } from "react";
import type { ChangeEvent, FormEvent, ReactNode } from "react";
import { ChevronLeft, ChevronRight, Quote, Send, Star, Upload, X } from "lucide-react";

import Container from "components/shared/Container";
import { useShop } from "components/shop/ShopContext";
import { apiRequest, getApiError } from "lib/api";

type ReviewMedia = {
  type: "image" | "video";
  url: string;
  name?: string;
  contentType?: string;
  size?: number;
};

type CustomerReview = {
  id: string;
  name: string;
  phone?: string;
  location?: string;
  title?: string;
  message: string;
  rating: number;
  media?: ReviewMedia;
};

type ReviewForm = {
  name: string;
  phone: string;
  location: string;
  title: string;
  message: string;
  rating: number;
  media?: ReviewMedia | null;
};

const MAX_REVIEW_MEDIA_SIZE = 8 * 1024 * 1024;

const emptyReviewForm: ReviewForm = {
  name: "",
  phone: "",
  location: "",
  title: "",
  message: "",
  rating: 5,
  media: undefined,
};

const fallbackTestimonials: CustomerReview[] = [
  {
    id: "static-1",
    name: "সাবিহা রহমান",
    location: "ধানমন্ডি, ঢাকা",
    title: "স্বাদে একদম আসল আর খুবই টাটকা",
    rating: 5,
    message:
      "প্রথমবার অর্ডার করেছিলাম একটু দ্বিধা নিয়ে, কিন্তু আম হাতে পাওয়ার পর সত্যিই মুগ্ধ হয়েছি। প্যাকেজিং খুব সুন্দর ছিল, আর আমগুলো ছিল একদম পাকা, মিষ্টি ও সুগন্ধি। পরিবারের সবাই খুব পছন্দ করেছে।",
  },
  {
    id: "static-2",
    name: "রাশেদুল ইসলাম",
    location: "খুলনা সদর",
    title: "ডেলিভারি দ্রুত, মানও দারুণ",
    rating: 5,
    message:
      "আমাদের এলাকায় অনলাইন থেকে ফল অর্ডার করলে অনেক সময় মান নিয়ে ভয় থাকে। কিন্তু সাতক্ষীরার আম সময়মতো পৌঁছে দিয়েছে এবং প্রতিটি আম যথেষ্ট ভালো ছিল। আবারও অর্ডার করার ইচ্ছা আছে।",
  },
  {
    id: "static-3",
    name: "ফারহানা কবির",
    location: "চট্টগ্রাম",
    title: "উপহার দেওয়ার জন্যও পারফেক্ট",
    rating: 5,
    message:
      "আত্মীয়দের বাসায় পাঠানোর জন্য আম নিয়েছিলাম। শুধু ফল না, পুরো presentation-টাই classy ছিল। যারা পেয়েছেন সবাই বলেছে আমের স্বাদ খুবই ভালো, আর packaging দেখে বোঝা গেছে যত্ন নিয়ে পাঠানো হয়েছে।",
  },
  {
    id: "static-4",
    name: "মাহমুদ হাসান",
    location: "রাজশাহী",
    title: "যেমন বলেছিল, ঠিক তেমনই পেয়েছি",
    rating: 5,
    message:
      "অনেকেই পণ্যের description-এ একরকম লেখে, পরে অন্যরকম জিনিস দেয়। এখানে সেটা হয়নি। variety, weight, ripeness সবকিছু মিলেছে। customer support-ও খুব ভদ্রভাবে handle করেছে।",
  },
  {
    id: "static-5",
    name: "নুসরাত জাহান",
    location: "মিরপুর, ঢাকা",
    title: "রিপিট অর্ডার করার মতো সার্ভিস",
    rating: 5,
    message:
      "আমার বাচ্চারা খুব picky eater, কিন্তু এই আম তারা খুব পছন্দ করেছে। নরম, মিষ্টি আর একদম fresh ছিল। সবচেয়ে ভালো লেগেছে যে অর্ডারের আগে confirm করে নিয়েছে, তাই ভুল হওয়ার সুযোগ ছিল না।",
  },
];

export default function TestimonialsSection() {
  const { user } = useShop();
  const [customerReviews, setCustomerReviews] = useState<CustomerReview[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [reviewForm, setReviewForm] = useState<ReviewForm>(emptyReviewForm);
  const [isSubmittingReview, setIsSubmittingReview] = useState(false);
  const [reviewSubmitError, setReviewSubmitError] = useState("");
  const [reviewSubmitSuccess, setReviewSubmitSuccess] = useState("");

  const testimonials = useMemo(
    () => [...customerReviews, ...fallbackTestimonials],
    [customerReviews],
  );

  useEffect(() => {
    let isMounted = true;

    const loadReviews = async () => {
      try {
        const reviews = await apiRequest<CustomerReview[]>(
          "/api/reviews?published=true",
        );

        if (isMounted) {
          setCustomerReviews(reviews);
        }
      } catch {
        if (isMounted) {
          setCustomerReviews([]);
        }
      }
    };

    void loadReviews();

    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    if (!user) return;

    setReviewForm((current) => ({
      ...current,
      name: current.name || user.name || "",
      phone: current.phone || user.phone || "",
    }));
  }, [user]);

  useEffect(() => {
    if (testimonials.length === 0) return;

    const interval = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % testimonials.length);
    }, 4200);

    return () => window.clearInterval(interval);
  }, [testimonials.length]);

  useEffect(() => {
    if (activeIndex >= testimonials.length) {
      setActiveIndex(0);
    }
  }, [activeIndex, testimonials.length]);

  const previous = () => {
    setActiveIndex((current) => (current - 1 + testimonials.length) % testimonials.length);
  };

  const next = () => {
    setActiveIndex((current) => (current + 1) % testimonials.length);
  };

  const updateReviewForm = <Key extends keyof ReviewForm>(
    key: Key,
    value: ReviewForm[Key],
  ) => {
    setReviewForm((current) => ({ ...current, [key]: value }));
  };

  const handleReviewMediaChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (!file) return;

    const mediaType = file.type.startsWith("video/") ? "video" : file.type.startsWith("image/") ? "image" : "";

    if (!mediaType) {
      setReviewSubmitError("শুধু ছবি বা ভিডিও আপলোড করুন।");
      return;
    }

    if (file.size > MAX_REVIEW_MEDIA_SIZE) {
      setReviewSubmitError("রিভিউ মিডিয়া ৮ MB-এর মধ্যে রাখুন।");
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      setReviewSubmitError("");
      updateReviewForm("media", {
        type: mediaType,
        url: String(reader.result),
        name: file.name,
        contentType: file.type,
        size: file.size,
      });
    };
    reader.readAsDataURL(file);
  };

  const submitReview = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setReviewSubmitError("");
    setReviewSubmitSuccess("");

    if (!reviewForm.name.trim() || !reviewForm.message.trim()) {
      setReviewSubmitError("নাম এবং রিভিউ লিখুন।");
      return;
    }

    try {
      setIsSubmittingReview(true);

      await apiRequest<CustomerReview>("/api/reviews", {
        method: "POST",
        body: JSON.stringify({
          ...reviewForm,
          source: "website",
        }),
      });

      setReviewSubmitSuccess("রিভিউ জমা হয়েছে। অনুমোদনের পরে ওয়েবসাইটে দেখা যাবে।");
      setReviewForm({
        ...emptyReviewForm,
        name: user?.name || "",
        phone: user?.phone || "",
      });
    } catch (error) {
      setReviewSubmitError(
        getApiError(error, "রিভিউ জমা হয়নি। আবার চেষ্টা করুন।"),
      );
    } finally {
      setIsSubmittingReview(false);
    }
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
                            className={`h-5 w-5 ${index < Math.round(item.rating || 5) ? "fill-current" : "text-[#fed7aa]"}`}
                          />
                        ))}
                      </div>

                      <h3 className="mt-5 text-[22px] font-bold leading-tight text-[#7c2d12] sm:text-[30px]">
                        {item.title || "কাস্টমার রিভিউ"}
                      </h3>
                      {item.media && (
                        <ReviewMedia media={item.media} className="mt-5 h-[220px] w-full rounded-[22px] object-cover sm:h-[280px]" />
                      )}
                      <p className="mt-5 text-[15px] leading-7 text-[#9a3412] sm:text-[17px] sm:leading-8">
                        {item.message}
                      </p>
                      <div className="mt-8">
                        <p className="text-lg font-bold text-[#7c2d12]">
                          {item.name}
                        </p>
                        <p className="mt-1 text-sm font-medium text-primary">
                          {item.location || "বাংলাদেশ"}
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
                        {item.location || "বাংলাদেশ"}
                      </p>
                    </div>
                    <span className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-primary">
                      {Number(item.rating || 5).toLocaleString("bn-BD")}/৫
                    </span>
                  </div>
                  <p className="mt-3 line-clamp-2 text-sm leading-6 text-[#9a3412] sm:leading-7">
                    {item.message}
                  </p>
                </button>
              ))}
            </div>
          </div>

          <form
            onSubmit={submitReview}
            className="mt-6 rounded-[24px] border border-[#fed7aa] bg-[#fffaf6] p-4 sm:p-5"
          >
            <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-sm font-semibold text-primary">আপনার রিভিউ</p>
                <h3 className="mt-1 text-2xl font-bold text-[#7c2d12]">
                  অভিজ্ঞতা শেয়ার করুন
                </h3>
              </div>
              <label className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-2xl border border-[#fed7aa] bg-white px-4 py-3 text-sm font-bold text-[#7c2d12] transition hover:border-primary">
                <Upload className="h-4 w-4 text-primary" />
                ছবি / ভিডিও
                <input
                  type="file"
                  accept="image/*,video/*"
                  onChange={handleReviewMediaChange}
                  className="sr-only"
                />
              </label>
            </div>

            <div className="mt-5 grid gap-4 md:grid-cols-2">
              <Field label="নাম" required>
                <input
                  required
                  value={reviewForm.name}
                  onChange={(event) => updateReviewForm("name", event.target.value)}
                  className="h-12 w-full rounded-2xl border border-[#fed7aa] bg-white px-4 text-[#7c2d12] outline-none focus:border-primary"
                  placeholder="আপনার নাম"
                />
              </Field>
              <Field label="মোবাইল">
                <input
                  value={reviewForm.phone}
                  onChange={(event) => updateReviewForm("phone", event.target.value)}
                  className="h-12 w-full rounded-2xl border border-[#fed7aa] bg-white px-4 text-[#7c2d12] outline-none focus:border-primary"
                  placeholder="01XXXXXXXXX"
                />
              </Field>
              <Field label="লোকেশন">
                <input
                  value={reviewForm.location}
                  onChange={(event) => updateReviewForm("location", event.target.value)}
                  className="h-12 w-full rounded-2xl border border-[#fed7aa] bg-white px-4 text-[#7c2d12] outline-none focus:border-primary"
                  placeholder="জেলা / এরিয়া"
                />
              </Field>
              <Field label="রেটিং">
                <select
                  value={reviewForm.rating}
                  onChange={(event) => updateReviewForm("rating", Number(event.target.value))}
                  className="h-12 w-full rounded-2xl border border-[#fed7aa] bg-white px-4 text-[#7c2d12] outline-none focus:border-primary"
                >
                  <option value={5}>৫ স্টার</option>
                  <option value={4}>৪ স্টার</option>
                  <option value={3}>৩ স্টার</option>
                  <option value={2}>২ স্টার</option>
                  <option value={1}>১ স্টার</option>
                </select>
              </Field>
              <div className="md:col-span-2">
                <Field label="শিরোনাম">
                  <input
                    value={reviewForm.title}
                    onChange={(event) => updateReviewForm("title", event.target.value)}
                    className="h-12 w-full rounded-2xl border border-[#fed7aa] bg-white px-4 text-[#7c2d12] outline-none focus:border-primary"
                    placeholder="ছোট করে আপনার অনুভূতি"
                  />
                </Field>
              </div>
              <div className="md:col-span-2">
                <Field label="রিভিউ" required>
                  <textarea
                    required
                    rows={4}
                    value={reviewForm.message}
                    onChange={(event) => updateReviewForm("message", event.target.value)}
                    className="w-full resize-none rounded-2xl border border-[#fed7aa] bg-white px-4 py-3 text-[#7c2d12] outline-none focus:border-primary"
                    placeholder="পণ্য, প্যাকেজিং বা ডেলিভারি সম্পর্কে লিখুন"
                  />
                </Field>
              </div>
            </div>

            {reviewForm.media && (
              <div className="mt-4 grid gap-3 rounded-2xl border border-[#fed7aa] bg-white p-3 sm:grid-cols-[160px_1fr_auto] sm:items-center">
                <ReviewMedia media={reviewForm.media} className="h-[120px] w-full rounded-2xl object-cover sm:w-[160px]" />
                <div className="min-w-0">
                  <p className="break-all text-sm font-bold text-[#7c2d12]">
                    {reviewForm.media.name || "Selected media"}
                  </p>
                  <p className="mt-1 text-xs font-semibold text-primary">
                    {reviewForm.media.type === "video" ? "ভিডিও" : "ছবি"}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => updateReviewForm("media", null)}
                  className="inline-flex items-center justify-center gap-2 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-bold text-red-700"
                >
                  <X className="h-4 w-4" />
                  সরান
                </button>
              </div>
            )}

            {reviewSubmitError && (
              <p className="mt-4 rounded-2xl bg-[#fff1e8] px-4 py-3 text-sm font-semibold text-[#9a3412]">
                {reviewSubmitError}
              </p>
            )}

            {reviewSubmitSuccess && (
              <p className="mt-4 rounded-2xl bg-[#f0fdf4] px-4 py-3 text-sm font-semibold text-[#166534]">
                {reviewSubmitSuccess}
              </p>
            )}

            <button
              type="submit"
              disabled={isSubmittingReview}
              className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-primary px-5 py-3.5 text-base font-semibold text-white transition hover:bg-[#ea580c] disabled:cursor-not-allowed disabled:bg-[#fdba74] sm:w-auto"
            >
              <Send className="h-5 w-5" />
              {isSubmittingReview ? "জমা হচ্ছে" : "রিভিউ জমা দিন"}
            </button>
          </form>
        </div>
      </Container>
    </section>
  );
}

function ReviewMedia({
  media,
  className,
}: {
  media: ReviewMedia;
  className: string;
}) {
  if (media.type === "video") {
    return (
      <video
        src={media.url}
        controls
        playsInline
        className={`${className} bg-[#2d1204]`}
      />
    );
  }

  return <img src={media.url} alt={media.name || "Customer review"} className={className} />;
}

function Field({
  label,
  required,
  children,
}: {
  label: string;
  required?: boolean;
  children: ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-semibold text-[#7c2d12]">
        {label}
        {required && <span className="text-primary"> *</span>}
      </span>
      {children}
    </label>
  );
}

"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  CheckCircle2,
  CreditCard,
  MapPin,
  MessageSquare,
  PackageCheck,
  Phone,
  ShoppingBag,
  Truck,
  Wallet,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import type { FormEvent, ReactNode } from "react";

import Container from "components/shared/Container";
import { useShop } from "components/shop/ShopContext";

const paymentMethods = [
  {
    id: "cash",
    title: "ক্যাশ অন ডেলিভারি",
    note: "পণ্য হাতে পেয়ে টাকা দিন",
  },
  {
    id: "bkash",
    title: "বিকাশ",
    note: "Send Money / Merchant Payment",
  },
  {
    id: "nagad",
    title: "নগদ",
    note: "Send Money / Merchant Payment",
  },
  {
    id: "rocket",
    title: "রকেট",
    note: "DBBL Rocket Payment",
  },
  {
    id: "online",
    title: "কার্ড / অনলাইন পেমেন্ট",
    note: "SSLCommerz payment link পাঠানো হবে",
  },
  {
    id: "bank",
    title: "ব্যাংক ট্রান্সফার",
    note: "অর্ডারের পরে ব্যাংক তথ্য কনফার্ম করা হবে",
  },
] as const;

type PaymentMethod = (typeof paymentMethods)[number]["id"];

type CustomerInfo = {
  name: string;
  phone: string;
  email: string;
  district: string;
  area: string;
  address: string;
  note: string;
  paymentPhone: string;
  transactionId: string;
};

const merchantNumber = "01779024048";

export default function OrderConfirmPage() {
  const router = useRouter();
  const { user, cart, cartTotal, openCart, markCartAsConfirmed } = useShop();
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("cash");
  const [submitted, setSubmitted] = useState(false);
  const [orderNumber, setOrderNumber] = useState("");
  const [customer, setCustomer] = useState<CustomerInfo>({
    name: "",
    phone: "",
    email: "",
    district: "ঢাকা",
    area: "",
    address: "",
    note: "",
    paymentPhone: "",
    transactionId: "",
  });

  useEffect(() => {
    if (!user) return;

    setCustomer((current) => ({
      ...current,
      name: current.name || user.name,
      phone: current.phone || user.phone,
      email: current.email || user.email,
    }));
  }, [user]);

  useEffect(() => {
    if (!submitted) return;

    const redirectTimer = window.setTimeout(() => {
      router.push("/");
    }, 10000);

    return () => window.clearTimeout(redirectTimer);
  }, [router, submitted]);

  const deliveryCharge = useMemo(() => {
    if (cart.length === 0) return 0;
    if (customer.district.trim() === "সাতক্ষীরা") return 80;
    if (customer.district.trim() === "ঢাকা") return 120;
    return 150;
  }, [cart.length, customer.district]);

  const grandTotal = cartTotal + deliveryCharge;
  const needsTransaction =
    paymentMethod === "bkash" ||
    paymentMethod === "nagad" ||
    paymentMethod === "rocket" ||
    paymentMethod === "bank";

  const updateCustomer = (field: keyof CustomerInfo, value: string) => {
    setCustomer((current) => ({ ...current, [field]: value }));
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (cart.length === 0) {
      openCart();
      return;
    }

    const nextOrderNumber = `SA-${Date.now().toString().slice(-6)}`;

    setOrderNumber(nextOrderNumber);
    markCartAsConfirmed(nextOrderNumber);
    setSubmitted(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (cart.length === 0) {
    return (
      <main className="bg-[#fffaf6] py-12">
        <Container>
          <div className="mx-auto max-w-[620px] rounded-[28px] border border-[#fed7aa] bg-white px-6 py-10 text-center shadow-sm">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#fff1e8] text-primary">
              <ShoppingBag className="h-8 w-8" />
            </div>
            <h1 className="mt-5 text-2xl font-bold text-[#7c2d12]">
              আপনার কার্ট খালি
            </h1>
            <p className="mt-3 text-sm leading-7 text-[#9a3412]">
              অর্ডার কনফার্ম করার আগে পছন্দের আম কার্টে যোগ করুন।
            </p>
            <Link
              href="/mango"
              className="mt-6 inline-flex rounded-2xl bg-primary px-6 py-3 font-semibold text-white transition hover:bg-[#ea580c]"
            >
              আম দেখতে যান
            </Link>
          </div>
        </Container>
      </main>
    );
  }

  return (
    <main className="bg-[#fffaf6] py-8 sm:py-12">
      {submitted && (
        <div className="fixed inset-0 z-[90] flex items-center justify-center bg-[#2d1204]/55 px-4">
          <div className="w-full max-w-[460px] rounded-[28px] border border-[#bbf7d0] bg-white px-6 py-7 text-center shadow-[0_30px_90px_rgba(45,18,4,0.28)]">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#dcfce7] text-[#16a34a]">
              <CheckCircle2 className="h-9 w-9" />
            </div>
            <h2 className="mt-5 text-2xl font-bold text-[#7c2d12]">
              অর্ডার কনফার্ম হয়েছে
            </h2>
            <p className="mt-3 text-sm leading-7 text-[#9a3412]">
              আপনার অর্ডার নম্বর {orderNumber}। আমাদের টিম ফোন করে ডেলিভারি ও
              পেমেন্ট কনফার্ম করবে।
            </p>
            <p className="mt-3 rounded-2xl bg-[#fff7f1] px-4 py-3 text-sm font-semibold text-primary">
              ১০ সেকেন্ড পরে আপনাকে হোম পেজে নিয়ে যাওয়া হবে।
            </p>
            <Link
              href="/"
              className="mt-5 inline-flex rounded-2xl bg-primary px-6 py-3 font-semibold text-white transition hover:bg-[#ea580c]"
            >
              এখনই হোমে যান
            </Link>
          </div>
        </div>
      )}

      <Container>
        {submitted && (
          <div className="mb-6 rounded-[24px] border border-[#bbf7d0] bg-[#f0fdf4] px-5 py-4 text-[#166534]">
            <div className="flex items-start gap-3">
              <CheckCircle2 className="mt-1 h-5 w-5 shrink-0" />
              <div>
                <h2 className="text-lg font-bold">
                  অর্ডার রিকোয়েস্ট নেওয়া হয়েছে
                </h2>
                <p className="mt-1 text-sm leading-6">
                  আপনার অর্ডার নম্বর {orderNumber}। আমাদের টিম ফোন করে ডেলিভারি
                  ও পেমেন্ট কনফার্ম করবে।
                </p>
              </div>
            </div>
          </div>
        )}

        <div className="mb-8">
          <p className="inline-flex rounded-full bg-[#fff1e8] px-4 py-2 text-sm font-semibold text-primary">
            নিরাপদ চেকআউট
          </p>
          <h1 className="mt-4 text-3xl font-bold leading-tight text-[#7c2d12] sm:text-4xl">
            অর্ডার কনফার্ম করুন
          </h1>
          <p className="mt-3 max-w-3xl text-[15px] leading-7 text-[#9a3412] sm:text-base">
            আপনার নাম, মোবাইল নম্বর, ঠিকানা এবং পেমেন্ট পদ্ধতি দিন। অর্ডার
            সাবমিট করার পরে ফোনে সব তথ্য যাচাই করা হবে।
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_420px]"
        >
          <div className="space-y-6">
            <section className="rounded-[28px] border border-[#fed7aa] bg-white p-5 shadow-sm sm:p-6">
              <div className="mb-5 flex items-center gap-3">
                <Phone className="h-5 w-5 text-primary" />
                <h2 className="text-xl font-bold text-[#7c2d12]">
                  কাস্টমার ডিটেইলস
                </h2>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <Field label="আপনার নাম" required>
                  <input
                    required
                    value={customer.name}
                    onChange={(event) =>
                      updateCustomer("name", event.target.value)
                    }
                    className="h-12 w-full rounded-2xl border border-[#fed7aa] bg-[#fffaf6] px-4 text-[#7c2d12] outline-none focus:border-primary"
                    placeholder="পুরো নাম"
                  />
                </Field>

                <Field label="মোবাইল নম্বর" required>
                  <input
                    required
                    value={customer.phone}
                    onChange={(event) =>
                      updateCustomer("phone", event.target.value)
                    }
                    className="h-12 w-full rounded-2xl border border-[#fed7aa] bg-[#fffaf6] px-4 text-[#7c2d12] outline-none focus:border-primary"
                    placeholder="01XXXXXXXXX"
                  />
                </Field>

                <Field label="ইমেইল">
                  <input
                    type="email"
                    value={customer.email}
                    onChange={(event) =>
                      updateCustomer("email", event.target.value)
                    }
                    className="h-12 w-full rounded-2xl border border-[#fed7aa] bg-[#fffaf6] px-4 text-[#7c2d12] outline-none focus:border-primary"
                    placeholder="example@email.com"
                  />
                </Field>

                <Field label="জেলা" required>
                  <input
                    required
                    value={customer.district}
                    onChange={(event) =>
                      updateCustomer("district", event.target.value)
                    }
                    className="h-12 w-full rounded-2xl border border-[#fed7aa] bg-[#fffaf6] px-4 text-[#7c2d12] outline-none focus:border-primary"
                    placeholder="ঢাকা / সাতক্ষীরা"
                  />
                </Field>
              </div>
            </section>

            <section className="rounded-[28px] border border-[#fed7aa] bg-white p-5 shadow-sm sm:p-6">
              <div className="mb-5 flex items-center gap-3">
                <MapPin className="h-5 w-5 text-primary" />
                <h2 className="text-xl font-bold text-[#7c2d12]">
                  ডেলিভারি ঠিকানা
                </h2>
              </div>

              <div className="grid gap-4">
                <Field label="থানা / এরিয়া" required>
                  <input
                    required
                    value={customer.area}
                    onChange={(event) =>
                      updateCustomer("area", event.target.value)
                    }
                    className="h-12 w-full rounded-2xl border border-[#fed7aa] bg-[#fffaf6] px-4 text-[#7c2d12] outline-none focus:border-primary"
                    placeholder="যেমন: মিরপুর, ধানমন্ডি, নলতা শরীফ"
                  />
                </Field>

                <Field label="সম্পূর্ণ ঠিকানা" required>
                  <textarea
                    required
                    rows={4}
                    value={customer.address}
                    onChange={(event) =>
                      updateCustomer("address", event.target.value)
                    }
                    className="w-full resize-none rounded-2xl border border-[#fed7aa] bg-[#fffaf6] px-4 py-3 text-[#7c2d12] outline-none focus:border-primary"
                    placeholder="বাসা/রোড/গ্রাম/পোস্ট অফিসসহ সম্পূর্ণ ঠিকানা"
                  />
                </Field>

                <Field label="অর্ডার নোট">
                  <textarea
                    rows={3}
                    value={customer.note}
                    onChange={(event) =>
                      updateCustomer("note", event.target.value)
                    }
                    className="w-full resize-none rounded-2xl border border-[#fed7aa] bg-[#fffaf6] px-4 py-3 text-[#7c2d12] outline-none focus:border-primary"
                    placeholder="ডেলিভারি সময় বা বিশেষ নির্দেশনা"
                  />
                </Field>
              </div>
            </section>

            <section className="rounded-[28px] border border-[#fed7aa] bg-white p-5 shadow-sm sm:p-6">
              <div className="mb-5 flex items-center gap-3">
                <Wallet className="h-5 w-5 text-primary" />
                <h2 className="text-xl font-bold text-[#7c2d12]">
                  পেমেন্ট পদ্ধতি
                </h2>
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                {paymentMethods.map((method) => (
                  <label
                    key={method.id}
                    className={`cursor-pointer rounded-2xl border px-4 py-3 transition ${
                      paymentMethod === method.id
                        ? "border-primary bg-[#fff1e8]"
                        : "border-[#fed7aa] bg-white hover:bg-[#fffaf6]"
                    }`}
                  >
                    <input
                      type="radio"
                      name="payment"
                      value={method.id}
                      checked={paymentMethod === method.id}
                      onChange={() => setPaymentMethod(method.id)}
                      className="sr-only"
                    />
                    <span className="block text-base font-bold text-[#7c2d12]">
                      {method.title}
                    </span>
                    <span className="mt-1 block text-sm leading-6 text-[#9a3412]">
                      {method.note}
                    </span>
                  </label>
                ))}
              </div>

              {paymentMethod === "cash" && (
                <PaymentNote icon={<Truck className="h-5 w-5" />}>
                  ক্যাশ অন ডেলিভারিতে পণ্য হাতে পাওয়ার পরে ডেলিভারি ম্যানকে পুরো
                  বিল পরিশোধ করুন।
                </PaymentNote>
              )}

              {(paymentMethod === "bkash" ||
                paymentMethod === "nagad" ||
                paymentMethod === "rocket") && (
                <PaymentNote icon={<Wallet className="h-5 w-5" />}>
                  {merchantNumber} নম্বরে পেমেন্ট করে নিচে পেমেন্ট নম্বর ও
                  ট্রানজেকশন আইডি লিখুন।
                </PaymentNote>
              )}

              {paymentMethod === "online" && (
                <PaymentNote icon={<CreditCard className="h-5 w-5" />}>
                  কার্ড বা অনলাইন পেমেন্টের জন্য অর্ডার সাবমিটের পরে নিরাপদ
                  payment link SMS/WhatsApp এ পাঠানো হবে।
                </PaymentNote>
              )}

              {paymentMethod === "bank" && (
                <PaymentNote icon={<PackageCheck className="h-5 w-5" />}>
                  ব্যাংক ট্রান্সফারের তথ্য ফোনে কনফার্ম করা হবে। পেমেন্ট হয়ে
                  গেলে ট্রানজেকশন রেফারেন্স দিন।
                </PaymentNote>
              )}

              {needsTransaction && (
                <div className="mt-4 grid gap-4 sm:grid-cols-2">
                  <Field label="যে নম্বর থেকে পেমেন্ট করেছেন" required>
                    <input
                      required
                      value={customer.paymentPhone}
                      onChange={(event) =>
                        updateCustomer("paymentPhone", event.target.value)
                      }
                      className="h-12 w-full rounded-2xl border border-[#fed7aa] bg-[#fffaf6] px-4 text-[#7c2d12] outline-none focus:border-primary"
                      placeholder="01XXXXXXXXX"
                    />
                  </Field>

                  <Field label="ট্রানজেকশন আইডি" required>
                    <input
                      required
                      value={customer.transactionId}
                      onChange={(event) =>
                        updateCustomer("transactionId", event.target.value)
                      }
                      className="h-12 w-full rounded-2xl border border-[#fed7aa] bg-[#fffaf6] px-4 text-[#7c2d12] outline-none focus:border-primary"
                      placeholder="Txn ID"
                    />
                  </Field>
                </div>
              )}
            </section>
          </div>

          <aside className="h-fit rounded-[28px] border border-[#fed7aa] bg-white p-5 shadow-sm lg:sticky lg:top-28">
            <div className="mb-5 flex items-center gap-3">
              <ShoppingBag className="h-5 w-5 text-primary" />
              <h2 className="text-xl font-bold text-[#7c2d12]">
                অর্ডার সামারি
              </h2>
            </div>

            <div className="space-y-4">
              {cart.map((item) => (
                <div key={item.id} className="flex gap-3">
                  <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-2xl">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-cover"
                      sizes="64px"
                    />
                  </div>
                  <div className="min-w-0 flex-1">
                    <h3 className="truncate font-semibold text-[#7c2d12]">
                      {item.name}
                    </h3>
                    <p className="mt-1 text-sm text-[#9a3412]">
                      {item.quantity} x {item.price.toLocaleString("bn-BD")}{" "}
                      টাকা
                    </p>
                  </div>
                  <p className="font-bold text-[#7c2d12]">
                    {(item.price * item.quantity).toLocaleString("bn-BD")}
                  </p>
                </div>
              ))}
            </div>

            <div className="my-5 border-t border-[#ffddb8]" />

            <div className="space-y-3 text-sm text-[#7c2d12]">
              <SummaryRow
                label="পণ্যের মূল্য"
                value={`${cartTotal.toLocaleString("bn-BD")} টাকা`}
              />
              <SummaryRow
                label="ডেলিভারি চার্জ"
                value={`${deliveryCharge.toLocaleString("bn-BD")} টাকা`}
              />
              <div className="flex items-center justify-between pt-3 text-lg font-bold">
                <span>মোট বিল</span>
                <span>{grandTotal.toLocaleString("bn-BD")} টাকা</span>
              </div>
            </div>

            <button
              type="submit"
              className="mt-6 w-full rounded-2xl bg-primary px-5 py-3.5 text-base font-semibold text-white transition hover:bg-[#ea580c]"
            >
              অর্ডার সাবমিট করুন
            </button>

            <div className="mt-4 rounded-2xl bg-[#fff7f1] px-4 py-3 text-sm leading-6 text-[#9a3412]">
              <MessageSquare className="mr-2 inline h-4 w-4 text-primary" />
              ডেলিভারির আগে ফোনে কনফার্ম করা হবে। আমের মান, প্যাকিং ও ঠিকানা
              যাচাই করে তারপর অর্ডার প্রসেস হবে।
            </div>
          </aside>
        </form>
      </Container>
    </main>
  );
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

function PaymentNote({
  icon,
  children,
}: {
  icon: ReactNode;
  children: ReactNode;
}) {
  return (
    <div className="mt-4 flex gap-3 rounded-2xl border border-[#fed7aa] bg-[#fff7f1] px-4 py-3 text-sm leading-6 text-[#9a3412]">
      <span className="mt-0.5 text-primary">{icon}</span>
      <p>{children}</p>
    </div>
  );
}

function SummaryRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between">
      <span>{label}</span>
      <span className="font-semibold">{value}</span>
    </div>
  );
}

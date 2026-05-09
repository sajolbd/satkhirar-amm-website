"use client";

import Image from "next/image";
import Link from "next/link";
import { CheckCircle2, Minus, Plus, ShoppingBag, Trash2, X } from "lucide-react";

import { useShop } from "components/shop/ShopContext";

export default function CartDrawer() {
  const {
    cart,
    cartTotal,
    isCartOpen,
    closeCart,
    removeFromCart,
    updateQuantity,
  } = useShop();
  const allItemsConfirmed =
    cart.length > 0 && cart.every((item) => item.orderStatus === "confirmed");

  return (
    <div
      className={`fixed inset-0 z-[75] transition-all duration-300 ${
        isCartOpen ? "visible opacity-100" : "invisible opacity-0"
      }`}
    >
      <div
        className="absolute inset-0 bg-[#2d1204]/45"
        onClick={closeCart}
      />

      <aside
        className={`absolute right-0 top-0 flex h-full w-full max-w-[420px] flex-col border-l border-[#fed7aa] bg-[#fffaf6] shadow-[0_20px_70px_rgba(124,45,18,0.18)] transition-transform duration-300 ${
          isCartOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between border-b border-[#ffddb8] px-5 py-5">
          <div>
            <p className="text-sm font-semibold tracking-[0.18em] text-primary">
              আপনার অর্ডার ব্যাগ
            </p>
            <h2 className="mt-1 text-2xl font-bold text-[#7c2d12]">
              Add To Cart
            </h2>
          </div>

          <button
            type="button"
            onClick={closeCart}
            className="rounded-full bg-white p-2 text-[#7c2d12] transition-colors hover:text-primary"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-5 py-5">
          {cart.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center rounded-[30px] border border-dashed border-[#fed7aa] bg-white px-6 py-10 text-center">
              <div className="rounded-full bg-[#fff1e8] p-4 text-primary">
                <ShoppingBag className="h-8 w-8" />
              </div>
              <h3 className="mt-5 text-xl font-bold text-[#7c2d12]">
                এখনো কোনো পণ্য যোগ করা হয়নি
              </h3>
              <p className="mt-3 text-sm leading-7 text-[#9a3412]">
                পছন্দের আম বেছে অর্ডার করুন, এখানে আপনার কার্টের সব পণ্য দেখা যাবে।
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {cart.map((item) => (
                <div
                  key={item.id}
                  className="rounded-[24px] border border-[#fed7aa] bg-white p-4 shadow-sm"
                >
                  <div className="flex gap-4">
                    <div className="relative h-20 w-20 overflow-hidden rounded-2xl">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-cover"
                        sizes="80px"
                      />
                    </div>

                    <div className="min-w-0 flex-1">
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <h3 className="text-lg font-semibold text-[#7c2d12]">
                            {item.name}
                          </h3>
                          <p className="mt-1 text-sm text-[#9a3412]">
                            {item.variety}
                          </p>
                          <p className="mt-1 text-sm font-medium text-primary">
                            {item.unit}
                          </p>
                          {item.orderStatus === "confirmed" && (
                            <span className="mt-2 inline-flex items-center gap-1 rounded-full bg-[#dcfce7] px-3 py-1 text-xs font-semibold text-[#166534]">
                              <CheckCircle2 className="h-3.5 w-3.5" />
                              অর্ডার কনফার্ম হয়েছে
                            </span>
                          )}
                        </div>

                        <button
                          type="button"
                          onClick={() => removeFromCart(item.id)}
                          className="text-[#9a3412] transition-colors hover:text-primary"
                        >
                          <Trash2 className="h-5 w-5" />
                        </button>
                      </div>

                      <div className="mt-4 flex items-center justify-between">
                        <div className="inline-flex items-center rounded-full border border-[#fdba74] bg-[#fff7f1]">
                          <button
                            type="button"
                            onClick={() => updateQuantity(item.id, "decrease")}
                            className="px-3 py-2 text-[#7c2d12]"
                          >
                            <Minus className="h-4 w-4" />
                          </button>
                          <span className="min-w-10 text-center text-sm font-semibold text-[#7c2d12]">
                            {item.quantity}
                          </span>
                          <button
                            type="button"
                            onClick={() => updateQuantity(item.id, "increase")}
                            className="px-3 py-2 text-[#7c2d12]"
                          >
                            <Plus className="h-4 w-4" />
                          </button>
                        </div>

                        <p className="text-lg font-bold text-[#7c2d12]">
                          {(item.price * item.quantity).toLocaleString("bn-BD")} টাকা
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="border-t border-[#ffddb8] bg-white px-5 py-5">
          <div className="flex items-center justify-between text-[#7c2d12]">
            <span className="text-base font-medium">মোট আনুমানিক বিল</span>
            <span className="text-2xl font-bold">
              {cartTotal.toLocaleString("bn-BD")} টাকা
            </span>
          </div>

          {allItemsConfirmed ? (
            <button
              type="button"
              disabled
              className="mt-4 w-full rounded-2xl bg-[#16a34a] px-5 py-3.5 text-base font-semibold text-white"
            >
              অর্ডার কনফার্ম হয়েছে
            </button>
          ) : cart.length > 0 ? (
            <Link
              href="/order-confirm"
              onClick={closeCart}
              className="mt-4 flex w-full items-center justify-center rounded-2xl bg-primary px-5 py-3.5 text-base font-semibold text-white transition hover:bg-[#ea580c]"
            >
              অর্ডার কনফার্ম করুন
            </Link>
          ) : (
            <button
              type="button"
              disabled
              className="mt-4 w-full rounded-2xl bg-[#fdba74] px-5 py-3.5 text-base font-semibold text-white"
            >
              অর্ডার কনফার্ম করুন
            </button>
          )}
        </div>
      </aside>
    </div>
  );
}

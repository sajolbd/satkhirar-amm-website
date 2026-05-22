"use client";

import { PackageCheck, Phone, ReceiptText, RefreshCw, UserRound, X } from "lucide-react";
import { useEffect, useMemo, useState } from "react";

import { useShop } from "components/shop/ShopContext";
import { apiRequest, getApiError } from "lib/api";

type WebsiteOrder = {
  id: string;
  customer: {
    name: string;
    phone: string;
    email?: string;
    district?: string;
    area?: string;
    address?: string;
    courierOffice?: string;
  };
  items: {
    id: string;
    name: string;
    unit: string;
    quantity: number;
    price: number;
    image?: string;
  }[];
  subtotal: number;
  deliveryCharge: number;
  total: number;
  status: string;
  date: string;
};

type ProfileDrawerProps = {
  isOpen: boolean;
  onClose: () => void;
};

function toBanglaNumber(value: number) {
  return Number(value || 0).toLocaleString("bn-BD");
}

export default function ProfileDrawer({ isOpen, onClose }: ProfileDrawerProps) {
  const { user } = useShop();
  const [orders, setOrders] = useState<WebsiteOrder[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [loadError, setLoadError] = useState("");

  const totalSpent = useMemo(
    () => orders.reduce((total, order) => total + Number(order.total || 0), 0),
    [orders],
  );

  const totalProducts = useMemo(
    () =>
      orders.reduce(
        (total, order) =>
          total + order.items.reduce((sum, item) => sum + Number(item.quantity || 0), 0),
        0,
      ),
    [orders],
  );

  const loadOrders = async () => {
    if (!user?.phone) return;

    try {
      setIsLoading(true);
      setLoadError("");
      const query = new URLSearchParams({ phone: user.phone });
      const nextOrders = await apiRequest<WebsiteOrder[]>(`/api/orders?${query.toString()}`);
      setOrders(nextOrders);
    } catch (error) {
      setLoadError(getApiError(error, "অর্ডার হিস্টোরি লোড হয়নি।"));
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (!isOpen || !user) return;

    void loadOrders();
  }, [isOpen, user?.phone]);

  if (!user) {
    return null;
  }

  return (
    <div
      className={`fixed inset-0 z-[78] transition-all duration-300 ${
        isOpen ? "visible opacity-100" : "invisible opacity-0"
      }`}
    >
      <button
        type="button"
        aria-label="প্রোফাইল বন্ধ করুন"
        className="absolute inset-0 bg-[#2d1204]/45"
        onClick={onClose}
      />

      <aside
        className={`absolute right-0 top-0 flex h-full w-full max-w-[460px] flex-col border-l border-[#fed7aa] bg-[#fffaf6] shadow-[0_20px_70px_rgba(124,45,18,0.18)] transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="border-b border-[#ffddb8] bg-white px-5 py-5">
          <div className="flex items-start justify-between gap-4">
            <div className="flex min-w-0 gap-3">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#fff1e8] text-primary">
                <UserRound className="h-6 w-6" />
              </div>
              <div className="min-w-0">
                <p className="text-sm font-semibold tracking-[0.18em] text-primary">
                  আপনার প্রোফাইল
                </p>
                <h2 className="mt-1 truncate text-2xl font-bold text-[#7c2d12]">
                  {user.name || user.phone}
                </h2>
                <p className="mt-1 flex items-center gap-1 text-sm font-semibold text-[#9a3412]">
                  <Phone className="h-4 w-4" />
                  {user.phone}
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="rounded-full bg-[#fff7f1] p-2 text-[#7c2d12] transition-colors hover:text-primary"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <div className="mt-5 grid grid-cols-3 gap-2">
            <ProfileMetric label="অর্ডার" value={toBanglaNumber(orders.length)} />
            <ProfileMetric label="পণ্য" value={toBanglaNumber(totalProducts)} />
            <ProfileMetric label="খরচ" value={`${toBanglaNumber(totalSpent)}৳`} />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto px-5 py-5">
          <div className="mb-4 flex items-center justify-between gap-3">
            <div>
              <p className="text-sm font-semibold text-primary">Purchase History</p>
              <h3 className="mt-1 text-xl font-bold text-[#7c2d12]">
                কেনা পণ্যের তালিকা
              </h3>
            </div>
            <button
              type="button"
              onClick={() => void loadOrders()}
              disabled={isLoading}
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[#fed7aa] bg-white text-[#7c2d12] transition hover:text-primary disabled:opacity-60"
              aria-label="রিফ্রেশ"
            >
              <RefreshCw className={`h-4 w-4 ${isLoading ? "animate-spin" : ""}`} />
            </button>
          </div>

          {loadError && (
            <p className="mb-4 rounded-2xl bg-[#fff1e8] px-4 py-3 text-sm font-semibold text-[#9a3412]">
              {loadError}
            </p>
          )}

          {isLoading && orders.length === 0 ? (
            <div className="rounded-[24px] border border-dashed border-[#fed7aa] bg-white px-5 py-10 text-center text-[#9a3412]">
              অর্ডার হিস্টোরি লোড হচ্ছে
            </div>
          ) : orders.length === 0 ? (
            <div className="rounded-[24px] border border-dashed border-[#fed7aa] bg-white px-5 py-10 text-center">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-[#fff1e8] text-primary">
                <PackageCheck className="h-6 w-6" />
              </div>
              <h3 className="mt-4 text-lg font-bold text-[#7c2d12]">
                এখনো কোনো অর্ডার নেই
              </h3>
              <p className="mt-2 text-sm leading-6 text-[#9a3412]">
                আপনি পণ্য অর্ডার করলে এখানে হিস্টোরি দেখা যাবে।
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {orders.map((order) => (
                <article
                  key={order.id}
                  className="rounded-[24px] border border-[#fed7aa] bg-white p-4 shadow-sm"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <div className="flex items-center gap-2">
                        <ReceiptText className="h-4 w-4 text-primary" />
                        <h4 className="font-bold text-[#7c2d12]">{order.id}</h4>
                      </div>
                      <p className="mt-1 text-xs font-semibold text-[#9a3412]">
                        {order.date || "তারিখ নেই"}
                      </p>
                    </div>
                    <span className="rounded-full bg-[#fff1e8] px-3 py-1 text-xs font-bold text-primary">
                      {order.status}
                    </span>
                  </div>

                  <div className="mt-4 space-y-3">
                    {order.items.map((item) => (
                      <div key={`${order.id}-${item.id}`} className="flex gap-3">
                        <div className="h-16 w-16 shrink-0 overflow-hidden rounded-2xl bg-[#fff1e8]">
                          {item.image ? (
                            <img
                              src={item.image}
                              alt={item.name}
                              className="h-full w-full object-cover"
                            />
                          ) : (
                            <div className="flex h-full w-full items-center justify-center text-xs font-bold text-primary">
                              ছবি নেই
                            </div>
                          )}
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="truncate font-bold text-[#7c2d12]">{item.name}</p>
                          <p className="mt-1 text-sm text-[#9a3412]">{item.unit}</p>
                          <p className="mt-1 text-sm font-semibold text-primary">
                            {toBanglaNumber(item.quantity)} x {toBanglaNumber(item.price)} টাকা
                          </p>
                        </div>
                        <p className="whitespace-nowrap text-sm font-bold text-[#7c2d12]">
                          {toBanglaNumber(item.quantity * item.price)} টাকা
                        </p>
                      </div>
                    ))}
                  </div>

                  <div className="mt-4 border-t border-[#ffddb8] pt-3 text-sm text-[#7c2d12]">
                    <div className="flex items-center justify-between">
                      <span>ডেলিভারি</span>
                      <span className="font-semibold">
                        {toBanglaNumber(order.deliveryCharge)} টাকা
                      </span>
                    </div>
                    <div className="mt-2 flex items-center justify-between text-base font-bold">
                      <span>মোট</span>
                      <span>{toBanglaNumber(order.total)} টাকা</span>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </aside>
    </div>
  );
}

function ProfileMetric({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-[#fed7aa] bg-[#fffaf6] px-3 py-3 text-center">
      <p className="text-xs font-semibold text-[#9a3412]">{label}</p>
      <p className="mt-1 text-sm font-bold text-[#7c2d12]">{value}</p>
    </div>
  );
}

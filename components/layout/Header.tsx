"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { LogIn, Menu, Search, ShoppingBag, UserRound, X } from "lucide-react";
import { useEffect, useState } from "react";
import type { FormEvent } from "react";

import AuthModal from "components/layout/AuthModal";
import CartDrawer from "components/layout/CartDrawer";
import Container from "components/shared/Container";
import { useShop } from "components/shop/ShopContext";
import { popularMangoes } from "data/popularMangoes";

const navItems = [
  { label: "হোম", href: "/" },
  { label: "আম", href: "/mango" },
  //   { label: "ফ্রোজেন ফুড", href: "/frozen-food" },
  { label: "গুড়", href: "/gur" },
  { label: "চারা", href: "/plants" },
  { label: "আচার", href: "/pickle" },
  { label: "তেল", href: "/oil" },
  { label: "মধু", href: "/honey" },
];

export default function Header() {
  const router = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const { user, cartCount, openAuth, openCart, signOut } = useShop();
  const normalizedSearch = searchQuery.trim().toLowerCase();
  const searchResults = normalizedSearch
    ? popularMangoes
        .filter((product) => {
          const searchableText = `${product.name} ${product.variety} ${product.id}`.toLowerCase();
          return searchableText.includes(normalizedSearch);
        })
        .slice(0, 5)
    : [];

  const handleSearchSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (searchResults.length === 0) return;

    router.push(`/mango#${searchResults[0].id}`);
    setSearchQuery("");
  };

  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  return (
    <>
      <header className="sticky top-0 z-50 border-b border-[#fed7aa] bg-[#fff1e8]/95 text-[#7c2d12] backdrop-blur-md">
        <Container className="px-4 sm:px-5 lg:px-8">
          <div className="flex h-16 items-center justify-between gap-2 sm:h-[86px] lg:h-[96px]">
            <div className="flex items-center gap-3 lg:flex-1">
              <button
                type="button"
                onClick={() => setMobileMenuOpen(true)}
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[#fed7aa] bg-white text-[#7c2d12] shadow-sm transition-colors hover:text-primary lg:hidden"
              >
                <Menu className="h-5 w-5" />
              </button>

              <Link
                href="/"
                className="flex h-11 w-[96px] items-center sm:h-[58px] sm:w-[135px] lg:h-[72px] lg:w-[180px]"
              >
                <Image
                  src="/images/logo.png"
                  alt="Logo"
                  width={180}
                  height={72}
                  sizes="(min-width: 1024px) 180px, (min-width: 640px) 135px, 96px"
                  className="h-full w-full object-contain object-left"
                  priority
                />
              </Link>
            </div>

            <nav className="hidden flex-1 items-center justify-center px-4 lg:flex xl:px-8">
              <div className="flex items-center justify-center gap-5 xl:gap-7">
                {navItems.map((item) => (
                  <Link
                    key={item.label}
                    href={item.href}
                    className="group relative inline-flex items-center justify-center whitespace-nowrap py-2 text-[16px] font-medium text-[#7c2d12] transition-colors duration-300 hover:text-primary xl:text-[17px]"
                  >
                    <span>{item.label}</span>
                    <span className="absolute bottom-0 left-0 h-[2px] w-full origin-left scale-x-0 rounded-full bg-primary transition-transform duration-300 ease-out group-hover:scale-x-100" />
                  </Link>
                ))}
              </div>
            </nav>

            <div className="flex items-center gap-2 sm:gap-3 lg:flex-1 lg:justify-end">
              {user && (
                <div className="hidden items-center gap-2 rounded-full border border-[#fdba74] bg-white px-4 py-2 text-sm font-medium text-[#7c2d12] xl:flex">
                  <UserRound className="h-4 w-4 text-primary" />
                  <span>{user.name}</span>
                </div>
              )}

              <div className="hidden items-center gap-3 sm:flex">
                <button
                  type="button"
                  onClick={openCart}
                  className="relative inline-flex h-11 w-11 items-center justify-center rounded-full border border-[#fdba74] bg-white text-[#7c2d12] transition-colors hover:text-primary"
                >
                  <ShoppingBag className="h-5 w-5" />
                  {cartCount > 0 && (
                    <span className="absolute -right-1 -top-1 inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-primary px-1 text-[11px] font-bold text-white">
                      {cartCount}
                    </span>
                  )}
                </button>

                {user ? (
                  <button
                    type="button"
                    onClick={signOut}
                    className="rounded-full border border-[#fdba74] px-4 py-2 text-sm font-semibold transition-colors hover:border-primary hover:text-primary"
                  >
                    লগআউট
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={() => openAuth("signin")}
                    className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-[#fdba74] bg-white text-[#7c2d12] transition-colors hover:text-primary"
                  >
                    <LogIn className="h-5 w-5" />
                  </button>
                )}
              </div>

              <div className="relative hidden xl:block">
                <form
                  onSubmit={handleSearchSubmit}
                  className="flex overflow-hidden rounded-full border border-[#fdba74] bg-white"
                >
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(event) => setSearchQuery(event.target.value)}
                    placeholder="আপনি কি খুঁজছেন?"
                    className="h-[42px] w-[230px] bg-transparent px-4 text-sm text-[#7c2d12] placeholder:text-[#c2410c]/70 outline-none"
                  />
                  <button
                    type="submit"
                    className="flex items-center justify-center bg-[#f97316] px-5 text-white transition hover:bg-[#ea580c]"
                  >
                    <Search className="h-4 w-4" />
                  </button>
                </form>

                {normalizedSearch && (
                  <div className="absolute right-0 top-[calc(100%+10px)] z-[90] w-[340px] overflow-hidden rounded-[22px] border border-[#fed7aa] bg-white shadow-[0_24px_70px_rgba(124,45,18,0.18)]">
                    {searchResults.length > 0 ? (
                      <div className="max-h-[360px] overflow-y-auto p-2">
                        {searchResults.map((product) => (
                          <Link
                            key={product.id}
                            href={`/mango#${product.id}`}
                            onClick={() => setSearchQuery("")}
                            className="flex gap-3 rounded-2xl px-3 py-3 transition hover:bg-[#fff7f1]"
                          >
                            <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-xl bg-[#fff1e8]">
                              <Image
                                src={product.image}
                                alt={product.name}
                                fill
                                sizes="56px"
                                className="object-cover"
                              />
                            </div>
                            <div className="min-w-0 flex-1">
                              <h3 className="truncate text-sm font-bold text-[#7c2d12]">
                                {product.name}
                              </h3>
                              <p className="mt-1 line-clamp-1 text-xs text-[#9a3412]">
                                {product.variety}
                              </p>
                              <p className="mt-1 text-xs font-semibold text-primary">
                                {product.price.toLocaleString("bn-BD")} টাকা
                              </p>
                            </div>
                          </Link>
                        ))}
                      </div>
                    ) : (
                      <div className="px-4 py-5 text-center text-sm font-medium text-[#9a3412]">
                        কোনো পণ্য পাওয়া যায়নি
                      </div>
                    )}
                  </div>
                )}
              </div>

              <div className="flex items-center gap-2 sm:hidden">
                <button
                  type="button"
                  onClick={openCart}
                  className="relative inline-flex h-10 w-10 items-center justify-center rounded-full border border-[#fed7aa] bg-white text-[#7c2d12]"
                >
                  <ShoppingBag className="h-[18px] w-[18px]" />
                  {cartCount > 0 && (
                    <span className="absolute -right-1 -top-1 inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-primary px-1 text-[11px] font-bold text-white">
                      {cartCount}
                    </span>
                  )}
                </button>
              </div>
            </div>
          </div>
        </Container>
      </header>

      <div
        className={`fixed inset-0 z-[60] transition-all duration-200 lg:hidden ${
          mobileMenuOpen ? "visible opacity-100" : "invisible opacity-0"
        }`}
      >
        <div
          className="absolute inset-0 bg-[#2f1202]/35 backdrop-blur-[2px]"
          onClick={() => setMobileMenuOpen(false)}
        />

        <div
          className={`absolute left-3 right-3 top-3 flex max-h-[calc(100vh-1.5rem)] flex-col overflow-hidden rounded-[22px] border border-[#fed7aa] bg-white px-4 pb-4 pt-3 text-[#7c2d12] shadow-[0_24px_70px_rgba(124,45,18,0.24)] transition-transform duration-200 ${
            mobileMenuOpen ? "translate-y-0" : "-translate-y-[120%]"
          }`}
        >
            <div className="flex items-center justify-between">
              <Link
                href="/"
                onClick={() => setMobileMenuOpen(false)}
                className="flex h-12 w-[108px] items-center rounded-xl bg-[#fff7f1] px-2"
              >
                <Image
                  src="/images/logo.png"
                  alt="Logo"
                  width={128}
                  height={58}
                  className="h-full w-full object-contain"
                />
              </Link>

              <button
                type="button"
                onClick={() => setMobileMenuOpen(false)}
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[#fed7aa] bg-[#fff7f1] text-[#7c2d12]"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="mt-4 grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  openCart();
                }}
                className="rounded-xl border border-[#fed7aa] bg-[#fff7f1] px-3 py-2.5 text-left"
              >
                <span className="block text-xs text-[#9a3412]">আপনার কার্ট</span>
                <span className="mt-1 block text-sm font-semibold">
                  {cartCount} আইটেম
                </span>
              </button>

              {user ? (
                <button
                  type="button"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    signOut();
                  }}
                  className="rounded-xl border border-[#fed7aa] bg-[#fff7f1] px-3 py-2.5 text-left"
                >
                  <span className="block text-xs text-[#9a3412]">একাউন্ট</span>
                  <span className="mt-1 block text-sm font-semibold">লগআউট</span>
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    openAuth("signin");
                  }}
                  className="rounded-xl border border-[#fed7aa] bg-[#fff7f1] px-3 py-2.5 text-left"
                >
                  <span className="block text-xs text-[#9a3412]">একাউন্ট</span>
                  <span className="mt-1 block text-sm font-semibold">সাইন ইন</span>
                </button>
              )}
            </div>

            <nav className="mt-4 overflow-y-auto">
              <div className="space-y-2">
                {navItems.map((item) => (
                  <Link
                    key={item.label}
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center justify-between rounded-xl border border-[#fed7aa] bg-white px-4 py-3 text-[16px] font-semibold text-[#7c2d12] transition hover:bg-[#fff7f1]"
                  >
                    <span>{item.label}</span>
                  </Link>
                ))}
              </div>
            </nav>

        </div>
      </div>

      <AuthModal />
      <CartDrawer />
    </>
  );
}

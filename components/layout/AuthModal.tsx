"use client";

import { FormEvent, useEffect, useState } from "react";
import { X } from "lucide-react";

import { useShop } from "components/shop/ShopContext";

const initialSignIn = {
  email: "",
  password: "",
};

const initialSignUp = {
  name: "",
  email: "",
  phone: "",
  password: "",
  confirmPassword: "",
};

export default function AuthModal() {
  const {
    isAuthOpen,
    authMode,
    closeAuth,
    openAuth,
    signIn,
    signUp,
  } = useShop();
  const [signInForm, setSignInForm] = useState(initialSignIn);
  const [signUpForm, setSignUpForm] = useState(initialSignUp);
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (!isAuthOpen) {
      setMessage("");
    }
  }, [isAuthOpen]);

  if (!isAuthOpen) {
    return null;
  }

  const handleSignIn = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const result = await signIn(signInForm);
    if (!result.ok) {
      setMessage(result.message || "লগইন করা যায়নি।");
      return;
    }

    setSignInForm(initialSignIn);
  };

  const handleSignUp = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const result = await signUp(signUpForm);
    if (!result.ok) {
      setMessage(result.message || "সাইন আপ সম্পন্ন হয়নি।");
      return;
    }

    setSignUpForm(initialSignUp);
  };

  return (
    <div className="fixed inset-0 z-[80] flex items-center justify-center bg-[#2d1204]/55 px-4 py-8">
      <div
        className="absolute inset-0"
        onClick={closeAuth}
      />

      <div className="relative z-10 w-full max-w-[520px] overflow-hidden rounded-[32px] border border-[#fed7aa] bg-white shadow-[0_30px_80px_rgba(124,45,18,0.22)]">
        <div className="flex items-start justify-between border-b border-[#ffedd5] bg-[linear-gradient(135deg,#fff7f1,#fff1e8)] px-6 py-5">
          <div>
            <p className="text-sm font-semibold tracking-[0.18em] text-primary">
              নিরাপদ একাউন্ট প্রবেশ
            </p>
            <h2 className="mt-2 text-2xl font-bold text-[#7c2d12]">
              {authMode === "signin" ? "সাইন ইন করুন" : "নতুন একাউন্ট খুলুন"}
            </h2>
          </div>

          <button
            type="button"
            onClick={closeAuth}
            className="rounded-full bg-white p-2 text-[#7c2d12] transition-colors hover:text-primary"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="px-6 py-6">
          {authMode === "signin" ? (
            <form className="space-y-4" onSubmit={handleSignIn}>
              <Field
                label="ইমেইল"
                value={signInForm.email}
                onChange={(value) =>
                  setSignInForm((current) => ({ ...current, email: value }))
                }
                type="email"
              />
              <Field
                label="পাসওয়ার্ড"
                value={signInForm.password}
                onChange={(value) =>
                  setSignInForm((current) => ({ ...current, password: value }))
                }
                type="password"
              />
              <button
                type="submit"
                className="w-full rounded-2xl bg-primary px-5 py-3.5 text-base font-semibold text-white transition hover:bg-[#ea580c]"
              >
                সাইন ইন করুন
              </button>
            </form>
          ) : (
            <form className="space-y-4" onSubmit={handleSignUp}>
              <Field
                label="পূর্ণ নাম"
                value={signUpForm.name}
                onChange={(value) =>
                  setSignUpForm((current) => ({ ...current, name: value }))
                }
              />
              <Field
                label="ইমেইল"
                value={signUpForm.email}
                onChange={(value) =>
                  setSignUpForm((current) => ({ ...current, email: value }))
                }
                type="email"
              />
              <Field
                label="মোবাইল নম্বর"
                value={signUpForm.phone}
                onChange={(value) =>
                  setSignUpForm((current) => ({ ...current, phone: value }))
                }
              />
              <Field
                label="পাসওয়ার্ড"
                value={signUpForm.password}
                onChange={(value) =>
                  setSignUpForm((current) => ({ ...current, password: value }))
                }
                type="password"
              />
              <Field
                label="পাসওয়ার্ড নিশ্চিত করুন"
                value={signUpForm.confirmPassword}
                onChange={(value) =>
                  setSignUpForm((current) => ({
                    ...current,
                    confirmPassword: value,
                  }))
                }
                type="password"
              />
              <button
                type="submit"
                className="w-full rounded-2xl bg-primary px-5 py-3.5 text-base font-semibold text-white transition hover:bg-[#ea580c]"
              >
                সাইন আপ সম্পন্ন করুন
              </button>
            </form>
          )}

          {message && (
            <p className="mt-4 rounded-2xl bg-[#fff1e8] px-4 py-3 text-sm font-medium text-[#9a3412]">
              {message}
            </p>
          )}

          <div className="mt-6 rounded-[24px] border border-[#ffedd5] bg-[#fffaf6] px-4 py-4 text-sm text-[#9a3412]">
            {authMode === "signin" ? (
              <p>
                নতুন গ্রাহক?{" "}
                <button
                  type="button"
                  onClick={() => openAuth("signup")}
                  className="font-semibold text-primary"
                >
                  সাইন আপ করুন
                </button>
              </p>
            ) : (
              <p>
                আগে থেকেই একাউন্ট আছে?{" "}
                <button
                  type="button"
                  onClick={() => openAuth("signin")}
                  className="font-semibold text-primary"
                >
                  সাইন ইন করুন
                </button>
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

type FieldProps = {
  label: string;
  value: string;
  onChange: (value: string) => void;
  type?: string;
};

function Field({ label, value, onChange, type = "text" }: FieldProps) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-semibold text-[#7c2d12]">
        {label}
      </span>
      <input
        type={type}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="h-12 w-full rounded-2xl border border-[#fed7aa] bg-[#fffaf6] px-4 text-[#7c2d12] outline-none transition focus:border-primary"
      />
    </label>
  );
}

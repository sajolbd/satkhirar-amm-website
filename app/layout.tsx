// app/layout.tsx

import type { Metadata } from "next";
import "./globals.css";

import { Josefin_Sans } from "next/font/google";
import ClientLayout from "./client-layout";
import { Providers } from "./providers";
import RootLayoutComponent from "components/layout/RootLayout";
import Header from "components/layout/Header";
import Footer from "components/layout/Footer";

const josefinSans = Josefin_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-josefin-sans",
});

function getSiteUrl() {
  const configuredUrl =
    process.env.NEXT_PUBLIC_SITE_URL ||
    process.env.VERCEL_PROJECT_PRODUCTION_URL ||
    process.env.VERCEL_URL ||
    "http://localhost:3000";

  const url = configuredUrl.startsWith("http")
    ? configuredUrl
    : `https://${configuredUrl}`;

  return url.replace(/\/$/, "");
}

const siteUrl = getSiteUrl();
const siteName = "সাতক্ষীরার আম";
const siteDescription =
  "সাতক্ষীরার ফ্রেশ আম, মধু ও দেশি পণ্য অনলাইনে অর্ডার করুন।";
const ogImage = {
  url: "/og-image.png",
  width: 1200,
  height: 630,
  alt: "Satkhirar Amm official online store",
};

/* ---------------- METADATA ---------------- */

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: siteName,
    template: `%s | ${siteName}`,
  },
  description: siteDescription,
  applicationName: siteName,
  icons: {
    icon: [{ url: "/favicon.png", sizes: "512x512", type: "image/png" }],
    shortcut: [{ url: "/favicon.png", type: "image/png" }],
    apple: [{ url: "/apple-icon.png", sizes: "180x180", type: "image/png" }],
  },
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: siteName,
    description: siteDescription,
    url: "/",
    siteName,
    locale: "bn_BD",
    type: "website",
    images: [ogImage],
  },
  twitter: {
    card: "summary_large_image",
    title: siteName,
    description: siteDescription,
    images: [ogImage.url],
  },
};

/* ---------------- ROOT LAYOUT ---------------- */

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="bn" className={josefinSans.variable}>
      <body>
        {/* NoScript Fallback */}
        <noscript>
          <style>
            {`
              * {
                opacity: 1 !important;
                transform: none !important;
              }
            `}
          </style>
        </noscript>

        <Providers>
          <RootLayoutComponent>
            <Header />
            <ClientLayout>{children}</ClientLayout>
            <Footer />
          </RootLayoutComponent>
        </Providers>
      </body>
    </html>
  );
}

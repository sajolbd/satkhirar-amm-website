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

const siteUrl = "https://dxg-digital.vercel.app";
const ogImageUrl = `${siteUrl}/og-image.png`;

/* ---------------- METADATA ---------------- */

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Satkhirar Amm",
  description: "Satkhirar Amm Website",
  icons: {
    icon: "/favicon.png",
    shortcut: "/favicon.png",
    apple: "/apple-icon.png",
  },
  openGraph: {
    title: "Satkhirar Amm",
    description: "Satkhirar Amm Website",
    url: siteUrl,
    siteName: "Satkhirar Amm",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: ogImageUrl,
        width: 1200,
        height: 630,
        alt: "Satkhirar Amm Logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "DXG Digital",
    description: "Satkhirar Amm Website",
    images: [ogImageUrl],
  },
};

/* ---------------- ROOT LAYOUT ---------------- */

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={josefinSans.variable}>
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

/*
 * @Author: Mohammad Felfelani
 * @Email: mfelfelani72@gmail.com
 * @Team:
 * @Date: 2025-10-12 08:09:32
 * @Description:
 */

import type { ReactNode } from "react";
import { Suspense } from "react";
import type { Metadata, Viewport } from "next";
import { cookies } from "next/headers";

// Constants

const allowIndex = process.env.NEXT_PUBLIC_ALLOW_INDEX === 'true';

// Components

import Loading from "./loading";
import Analysis from "./Analysis";

// Fonts

import { satoshi, iranSans } from "@/libraries/app/fonts";

// CSS

import "./globals.css";

import { getCookieAppTheme, getCookieAppLang } from "forma-li"

const capitalLicenseName =
  (process.env.NEXT_PUBLIC_LICENSE_NAME || "sky")
    .charAt(0)
    .toUpperCase() +
  (process.env.NEXT_PUBLIC_LICENSE_NAME || "sky").slice(1);

export const metadata: Metadata = {
  title: capitalLicenseName,
  manifest: "/manifest.json",

  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: capitalLicenseName,
  },

  robots: allowIndex ? {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  } : {
    index: false,
    follow: false,
    googleBot: {
      index: false,
      follow: false,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
      noarchive: true,
      nosnippet: true,
    },
  },

  other: allowIndex ? {

    'bingbot': 'index, follow, max-video-preview:-1, max-image-preview:large, max-snippet:-1',
    'yandex': 'index, follow, max-video-preview:-1, max-image-preview:large, max-snippet:-1',
    'slurp': 'index, follow',
    'duckduckbot': 'index, follow',
  } : {
    'bingbot': 'noindex, nofollow, noarchive, nosnippet',
    'yandex': 'noindex, nofollow, noarchive, nosnippet',
    'slurp': 'noindex, nofollow',
    'duckduckbot': 'noindex, nofollow',
  },

};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#000000" },
  ],
};

export default async function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  //  dark and light

  const cookieStore = await cookies();

  const theme = await getCookieAppTheme(cookieStore);
  const lang = await getCookieAppLang(cookieStore);

  return (
    <html
      className={`${iranSans.variable} ${satoshi.variable} ${theme === "dark" ? "dark" : ""
        }`}
      lang={lang.lang}
      data-theme={process.env.NEXT_PUBLIC_LICENSE_NAME}
    >
      <head>
        <Analysis />
      </head>
      <body className="overflow-auto font-iranSans">
        <Suspense fallback={<Loading />}>{children}</Suspense>
      </body>
    </html>
  );
}

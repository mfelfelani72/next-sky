/*
 * @Author: Mohammad Felfelani
 * @Email: mfelfelani72@gmail.com
 * @Team:
 * @Date: 2025-10-12 08:09:32
 * @Description:
 */

import type { ReactNode } from "react";

// Fonts

import { satoshi, yekanBakh } from "@/libraries/app/fonts";

// CSS

import "./globals.css";

// Functions

import { getCookieAppTheme } from "@/libraries/app/cookieUtils";

export default async function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  const theme = await getCookieAppTheme();

  return (
    <html
      className={`${yekanBakh.variable} ${satoshi.variable} ${
        theme === "dark" ? "dark" : ""
      }`}
    >
      <head>
        <meta name="robots" content="noindex, nofollow, noarchive, nosnippet" />
        <meta
          name="googlebot"
          content="noindex, nofollow, noarchive, nosnippet"
        />
        <meta
          name="bingbot"
          content="noindex, nofollow, noarchive, nosnippet"
        />
        <meta name="yandex" content="noindex, nofollow, noarchive, nosnippet" />
      </head>
      <body className="overflow-auto">{children}</body>
    </html>
  );
}

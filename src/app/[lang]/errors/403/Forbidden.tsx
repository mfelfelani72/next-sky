/*
 * @Author: Mohammad Felfelani
 * @Email: mfelfelani72@gmail.com
 * @Team: beyki (beyki)
 * @Date: 2025-10-12
 * @Description: 403 Forbidden Page
 */

"use client";

import { usePathname } from "next/navigation";

// Components

import Image from "@/components/base/Image";
import LocalizedLink from "@/components/base/LocalizedLink";

// Functions

import { createTranslator } from "@/libs/translation";

// Interfaces

import { Lang } from "@/configs/app/language";

export default function Forbidden() {
  // Hooks

  const pathname = usePathname();
  // Functions

  const { t } = createTranslator(pathname.split("/")[1] as Lang);

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-Neutral-50 to-Neutral-100 dark:from-Neutral-500 dark:to-Neutral-600 px-4">
      <div className="text-center max-w-xl w-full flex flex-col items-center">
        {/* Logo */}
        <Image
          src="/images/png/brand/logo.png"
          alt="Site logo"
          width={210}
          height={210}
          className=""
        />

        {/* 403 */}
        <h1 className="text-7xl sm:text-8xl font-extrabold tracking-tight text-Neutral-300 dark:text-Neutral-50 mb-6">
          403
        </h1>

        {/* Main message */}
        <p className="text-lg sm:text-2xl text-Neutral-400 dark:text-Neutral-200 mb-4">
          {t("main_message_403")}
        </p>

        {/* Explanation */}
        <p className="text-sm sm:text-base text-Neutral-500 dark:text-Neutral-300 mb-8">
          {t("explanation_403")}
        </p>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
          <LocalizedLink
            
            href={"/auth/login"}
            className="px-10 py-3 rounded-lg bg-primary-400 text-Neutral-50 hover:bg-primary-600 transition duration-500"
          >
            {t("login")}
          </LocalizedLink>

          <LocalizedLink
            
            href="/auth/register"
            className="px-10 py-3 rounded-lg border border-Neutral-300 dark:border-Neutral-400 text-Neutral-500 dark:text-Neutral-200 hover:bg-Neutral-100 dark:hover:bg-Neutral-500 transition duration-500"
          >
            {t("register")}
          </LocalizedLink>
        </div>
      </div>
    </div>
  );
}

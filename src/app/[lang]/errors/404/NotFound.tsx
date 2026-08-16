/*
 * @Author: Mohammad Felfelani
 * @Email: mfelfelani72@gmail.com
 * @Team: beyki (beyki)
 * @Date: 2025-10-12 08:09:32
 * @Description:
 */

"use client";

import { usePathname, useRouter } from "next/navigation";

// Components
import Image from "@/components/base/Image";
import LocalizedLink from "@/components/base/LocalizedLink";

// Functions

import { createTranslator } from "forma-li"

// Interfaces

import { Lang } from "@/configs/app/language";

export default function NotFound() {
  // Hooks

  const pathname = usePathname();
  const router = useRouter();

  // Functions

  const { t } = createTranslator(pathname.split("/")[1] as Lang);

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-Neutral-50 to-Neutral-100 dark:from-Neutral-500 dark:to-Neutral-600 px-4">
      {/* Content */}
      <div className="text-center max-w-xl w-full flex flex-col items-center">
        {/* Logo */}
        <Image
          src="/images/png/brand/logo.png"
          alt="Site logo"
          width={200}
          height={200}
          className=""
          enableLoading={false}
        />

        {/* 404 */}
        <h1 className="text-7xl sm:text-8xl font-extrabold tracking-tight text-Neutral-300 dark:text-Neutral-50 mb-6">
          {t("title_404")}
        </h1>

        {/* Main message */}
        <p className="text-lg sm:text-2xl text-Neutral-400 dark:text-Neutral-200 mb-4">
          {t("main_message_404")}
        </p>

        {/* Explanation */}
        <p className="text-sm sm:text-base text-Neutral-500 dark:text-Neutral-300 mb-8">
          {t("explanation_404")}
        </p>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
          <LocalizedLink
            
            href={`${process.env.NEXT_PUBLIC_BASE_ROUTE}`}
            className="px-12 py-3 rounded-lg bg-primary-400 text-Neutral-50 hover:bg-primary-500 transition duration-300"
          >
            {t("go_home")}
          </LocalizedLink>

          <div
            onClick={() => router.back()}
            className="px-6 py-3 rounded-lg border border-Neutral-300 dark:border-Neutral-400 text-Neutral-500 dark:text-Neutral-200 hover:bg-Neutral-100 dark:hover:bg-Neutral-500 transition duration-300 cursor-pointer"
          >
            {t("go_back")}
          </div>
        </div>
      </div>
    </div>
  );
}

/*
 * @Author: Mohammad Felfelani
 * @Email: mfelfelani72@gmail.com
 * @Team: Sina Salehi (Elrond)
 * @Date: 2025-10-18 08:18:52
 * @Description:
 */

"use client";

import { useTranslation } from "@/hooks/app/useTranslation";

// Components

import Image from "@/components/base/Image";
import LocalizedLink from "@/components/base/LocalizedLink";
import Copyright from "@/components/ui/core/Copyright";
import { HomeIcon, RefreshCcw } from "lucide-react";

// Interfaces

interface ErrorCardProps {
  icon?: React.ReactNode;
  code?: string | number;
  title?: string;
  description?: string;
  backgroundImage?: string;
  lang: Lang;
}

import { Lang } from "@/configs/app/language";

export default function ErrorCard({
  icon,
  code,
  title,
  description,
  backgroundImage = "/images/errors/default-wallpaper.jpg",
  lang,
}: ErrorCardProps) {
  // Hooks

  const { t } = useTranslation();

  return (
    <>
      <div className="fixed inset-0 -z-30 bg-cover bg-center bg-fixed bg-no-repeat">
        <Image
          src={backgroundImage}
          alt="Background Wallpaper"
          fill
          className="object-cover"
          enableLoading={false}
        />
      </div>

      <div className="min-h-screen grid place-items-center p-4 sm:p-6 md:p-8">
        <div className="relative w-full text-center overflow-hidden max-w-[92vw] sm:max-w-110 md:max-w-120 lg:max-w-130 p-6 sm:p-8 md:p-10 lg:p-12 rounded-2xl sm:rounded-3xl md:rounded-4xl bg-linear-to-br from-white/10 via-white/5 to-white/3 backdrop-blur-[0.5px] backdrop-saturate-100 backdrop-brightness-110 shadow-[0_8px_32px_rgba(0,0,0,0.12),0_2px_8px_rgba(0,0,0,0.08),inset_0_0_0_1px_rgba(255,255,255,0.25),inset_0_2px_4px_rgba(255,255,255,0.2)] before:content-[''] before:absolute before:top-0 before:left-0 before:right-0 before:h-1/2 before:rounded-t-2xl sm:before:rounded-t-3xl md:before:rounded-t-4xl before:rounded-b-[60%] before:bg-linear-to-b before:from-white/25 before:via-white/8 before:to-transparent before:pointer-events-none after:content-[''] after:absolute after:inset-0 after:rounded-[inherit] after:p-[1.5px] after:bg-linear-to-br after:from-white/50 after:via-white/15 after:to-transparent after:pointer-events-none after:[mask:linear-gradient(#fff_0_0)_content-box,linear-gradient(#fff_0_0)] after:mask-exclude">
          <div className="relative z-10">
            <div className="mx-auto grid place-items-center w-16 h-16 rounded-xl mb-4 sm:w-18 sm:h-18 sm:rounded-2xl sm:mb-5 md:w-20 md:h-20 md:rounded-[20px] bg-linear-to-br from-white/30 to-white/10 shadow-[0_4px_16px_rgba(0,0,0,0.1),inset_0_0_0_1px_rgba(255,255,255,0.3),inset_0_2px_4px_rgba(255,255,255,0.3)] backdrop-blur-lg">
              {icon}
            </div>

            <p className="font-bold leading-none mb-1 sm:mb-2 text-5xl sm:text-6xl md:text-7xl lg:text-[80px] tracking-[-2px] sm:tracking-[-3px] text-white/95 drop-shadow-[0_4px_12px_rgba(0,0,0,0.1)]">
              {code}
            </p>

            <h1 className="font-semibold mb-2 sm:mb-3 text-lg sm:text-xl md:text-2xl text-white/90 drop-shadow-[0_1px_4px_rgba(0,0,0,0.15)]">
              {title}
            </h1>

            <p className="mx-auto leading-relaxed max-w-[32ch] sm:max-w-[36ch] md:max-w-[38ch] text-sm sm:text-[15px] md:text-base text-white/75 drop-shadow-[0_1px_3px_rgba(0,0,0,0.12)]">
              {description}
            </p>

            <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mt-5 sm:mt-6 md:mt-7 flex-col sm:flex-row">
              <LocalizedLink
                
                href={process.env.NEXT_PUBLIC_BASE_ROUTE || "/"}
                className="group relative inline-flex items-center justify-center overflow-hidden gap-2 font-semibold px-5 py-3 rounded-xl text-sm sm:px-6 sm:py-3.5 sm:rounded-2xl sm:text-[15px] md:px-7 md:py-4 text-black/85 bg-linear-to-br from-white/95 to-white/85 shadow-[0_4px_16px_rgba(0,0,0,0.15),0_1px_3px_rgba(0,0,0,0.1),inset_0_1px_0_rgba(255,255,255,1),inset_0_-1px_0_rgba(0,0,0,0.05)] hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(0,0,0,0.2),0_2px_6px_rgba(0,0,0,0.12),inset_0_1px_0_rgba(255,255,255,1)] active:translate-y-0 transition-all duration-200 before:content-[''] before:absolute before:top-0 before:left-0 before:right-0 before:h-1/2 before:bg-linear-to-b before:from-white/25 before:to-transparent before:rounded-t-xl sm:before:rounded-t-2xl before:rounded-b-[50%] before:pointer-events-none w-full sm:w-auto"
              >
                <HomeIcon />
                {t("go_home")}
              </LocalizedLink>

              <button
                onClick={() => window.location.reload()}
                className="group relative inline-flex items-center justify-center overflow-hidden gap-2 font-semibold px-5 py-3 rounded-xl text-sm sm:px-6 sm:py-3.5 sm:rounded-2xl sm:text-[15px] md:px-7 md:py-4 text-white/95 bg-linear-to-br from-white/20 to-white/8 shadow-[0_4px_16px_rgba(0,0,0,0.1),inset_0_0_0_1px_rgba(255,255,255,0.25),inset_0_1px_2px_rgba(255,255,255,0.2)] backdrop-blur-xl hover:-translate-y-0.5 hover:from-white/[0.28] hover:to-white/12 hover:shadow-[0_8px_24px_rgba(0,0,0,0.15),inset_0_0_0_1px_rgba(255,255,255,0.35),inset_0_1px_2px_rgba(255,255,255,0.3)] active:translate-y-0 transition-all duration-200 before:content-[''] before:absolute before:top-0 before:left-0 before:right-0 before:h-1/2 before:bg-linear-to-b before:from-white/25 before:to-transparent before:rounded-t-xl sm:before:rounded-t-2xl before:rounded-b-[50%] before:pointer-events-none w-full sm:w-auto"
              >
                <RefreshCcw />
                {t("refresh")}
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="fixed bottom-0 inset-x-0 inline-flex items-center justify-center">
        <Copyright params={{ lang }} />
      </div>
    </>
  );
}

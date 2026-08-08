/*
 * @Author: Mohammad Felfelani
 * @Email: mfelfelani72@gmail.com
 * @Team:
 * @Date: 2025-10-04 11:48:20
 * @Description:
 */

// Components

import LanguageSwitcher from "@/components/base/LanguageSwitcher";

// Interfaces

import { LangLayoutProps } from "@/interfaces/app/global";

export default async function LangLayout({
  children,
  params,
}: LangLayoutProps) {
  return (
    <>
      <div className="absolute inset-0">
        <div className="flex flex-row backdrop-blur-xs w-full h-14 items-center justify-between px-4 mdd:px-20 xll:px-30  border border-b-Neutral-400 relative z-900">
         <div className="text-Neutral-100 font-semibold text-xl">Skytech mission</div>
          <LanguageSwitcher />
        </div>
      </div>
      {children}
    </>
  );
}

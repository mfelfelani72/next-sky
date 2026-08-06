/*
 * @Author: Mohammad Felfelani
 * @Email: mfelfelani72@gmail.com
 * @Date: 2025-12-29
 * @Description: Register Page - Desktop Only
 */

"use client";

import { useTranslation } from "@/hooks/useTranslation";

// Components

import LeftSidebar from "@/components/ui/auth/common/LeftSidebar";
import RegisterForm from "@/components/ui/auth/common/register/RegisterForm";
import { ChessBoardAnimation } from "@/components/ui/core/ChessBoard";

export default function Register() {
  const { t } = useTranslation();

  return (
    <>
      <div className="relative">
        <div className="absolute top-[0rem] rtl:right-[55rem] ltr:left-[30rem] z-[100] opacity-50">
          <ChessBoardAnimation
            id={"table-welcome-bottom"}
            className={"rotate-[28deg] skew-x-[-45deg] skew-y-[-15deg]"}
            bordClassName={`grid-cols-16 grid-rows-16 w-[100rem] h-[100rem]`}
            backgroundColor={"bg-[#dadada]"}
            mosaicClassName={"border-[#dadada]"}
          />
        </div>
        <div className="relative inline-flex flex-row z-[120] h-full">
          <LeftSidebar
            title={t("register_title")}
            description={t("register_description")}
            className="rounded-2xl w-[32rem]"
          >
            <RegisterForm />
          </LeftSidebar>
        </div>
      </div>
    </>
  );
}

/*
 * @Author: Mohammad Felfelani
 * @Email: mfelfelani72@gmail.com
 * @Date: 2025-12-29
 * @Description: Login Page - Desktop Only
 */

"use client";

import { useTranslation } from "@/hooks/useTranslation";

// Components

import RightSidebar from "@/components/ui/auth/common/RightSidebar";
import LeftSidebar from "@/components/ui/auth/common/LeftSidebar";
import RegisterForm from "@/components/ui/auth/common/register/RegisterForm";
import RegisterDetails from "@/components/ui/auth/common/register/RegisterDetails";
import { ChessBoardAnimation } from "@/components/ui/core/ChessBoard";

export default function Login() {
  const { t } = useTranslation();

  return (
    <>
      <div className="relative">
        <div className="absolute top-60 rtl:right-160 ltr:left-120 z-100 opacity-50">
          <ChessBoardAnimation
            id={"table-welcome-bottom"}
            className={"rotate-28 skew-x-[-45deg] skew-y-[-15deg]"}
            bordClassName={`grid-cols-16 grid-rows-16 w-[100rem] h-[100rem]`}
            backgroundColor={"bg-[#dadada]"}
            mosaicClassName={"border-[#dadada]"}
          />
        </div>
        <div className="relative inline-flex flex-row z-120 h-full">
          <LeftSidebar
            title={t("register_title")}
            description={t("register_description")}
          >
            <RegisterForm />
          </LeftSidebar>
          <RightSidebar>
            <RegisterDetails />
          </RightSidebar>
        </div>
      </div>
    </>
  );
}

/*
 * @Author: Mohammad Felfelani
 * @Email: mfelfelani72@gmail.com
 * @Date: 2025-12-29
 * @Description: Login Page - Desktop Only
 */

"use client";

import { useTranslation } from "@/hooks/app/useTranslation";

// Components

import RightSidebar from "@/components/ui/auth/common/RightSidebar";
import LeftSidebar from "@/components/ui/auth/common/LeftSidebar";
import RegisterForm from "@/components/ui/auth/common/register/RegisterForm";
import RegisterDetails from "@/components/ui/auth/common/register/RegisterDetails";

export default function Login() {
  const { t } = useTranslation();

  return (
    <>
      <div className="flex flex-row h-screen w-full items-center justify-center">
        <div className="relative inline-flex flex-row z-120 max-w-[60dvw] h-[77dvh]">
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

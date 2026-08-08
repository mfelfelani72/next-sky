/*
 * @Author: Mohammad Felfelani
 * @Email: mfelfelani72@gmail.com
 * @Date: 2025-12-29
 * @Description: Register Page - Desktop Only
 */

"use client";

// Components

import LeftSidebar from "@/components/ui/auth/common/LeftSidebar";
import RegisterForm from "@/components/ui/auth/common/register/RegisterForm";

// Hooks

import { useTranslation } from "@/hooks/app/useTranslation";

export default function Register() {
  // Hooks

  const { t } = useTranslation();

  return (
    <>
      <div className="flex flex-row h-screen w-full items-center justify-center">
        <div className="relative inline-flex flex-row z-120 max-w-[60dvw] h-[77dvh]">
          <LeftSidebar
            title={t("register_title")}
            description={t("register_description")}
            className="rounded-2xl w-lg"
          >
            <RegisterForm />
          </LeftSidebar>
        </div>
      </div>
    </>
  );
}

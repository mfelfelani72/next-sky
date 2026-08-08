/*
 * @Author: Mohammad Felfelani
 * @Email: mfelfelani72@gmail.com
 * @Date: 2025-12-29
 * @Description: Login Page - Desktop Only
 */

"use client";

// Components

import LeftSidebar from "@/components/ui/auth/common/LeftSidebar";
import ForgotPasswordForm from "@/components/ui/auth/common/forgotPassword/ForgotPasswordForm";

// Hooks

import { useTranslation } from "@/hooks/app/useTranslation";

export default function ForgotPassword() {
  // Hooks

  const { t } = useTranslation();

  return (
    <>
      <div className="flex flex-row h-screen w-full items-center justify-center">
        <div className="relative inline-flex flex-row z-120 max-w-[60dvw] h-[77dvh]">
          <LeftSidebar
            title={t("forgot_password_title")}
            description={t("forgot_password_description")}
            className="rounded-2xl w-lg"
          >
            <ForgotPasswordForm />
          </LeftSidebar>
        </div>
      </div>
    </>
  );
}

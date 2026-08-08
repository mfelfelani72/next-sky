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

const ForgotPassword = () => {
  // Hooks

  const { t } = useTranslation();
  return (
    <>
      <div className="flex flex-row h-screen w-full items-center justify-center">
        <div className="h-full flex items-center justify-center px-4">
          <LeftSidebar
            title={t("login_title")}
            description={t("login_description")}
            className="w-full h-[calc(100vh-10rem)] rounded-2xl shadow-2xl"
          >
            <ForgotPasswordForm />
          </LeftSidebar>
        </div>
      </div>
    </>
  );
};

export default ForgotPassword;

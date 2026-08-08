/*
 * @Author: Mohammad Felfelani
 * @Email: mfelfelani72@gmail.com
 * @Date: 2025-12-29
 * @Description: Login Page - Desktop Only
 */

"use client";

// Components

import RightSidebar from "@/components/ui/auth/common/RightSidebar";
import LeftSidebar from "@/components/ui/auth/common/LeftSidebar";
import LoginForm from "@/components/ui/auth/common/login/LoginForm";
import LoginDetails from "@/components/ui/auth/common/login/LoginDetails";

// Hooks

import { useTranslation } from "@/hooks/app/useTranslation";

export default function Login() {
  const { t } = useTranslation();

  return (
    <div className="flex flex-row h-screen w-full items-center justify-center">
      <div className="relative inline-flex flex-row z-120 max-w-[60dvw] h-[77dvh]">
        <LeftSidebar
          title={t("login_title")}
          description={t("login_description")}
        >
          <LoginForm />
        </LeftSidebar>
        <RightSidebar>
          <LoginDetails />
        </RightSidebar>
      </div>
    </div>
  );
}

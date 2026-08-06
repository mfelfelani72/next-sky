/*
 * @Author: Mohammad Felfelani
 * @Email: mfelfelani72@gmail.com
 * @Date: 2025-12-29
 * @Description: Login Page - Desktop Only
 */

"use client";

import { useTranslation } from "@/hooks/app/useTranslation";

// Components

import LeftSidebar from "@/components/ui/auth/common/LeftSidebar";
import LoginForm from "@/components/ui/auth/common/login/LoginForm";

export default function Login() {
  const { t } = useTranslation();

  return (
    <>
      <div className="relative">
        
        <div className="relative inline-flex flex-row z-[120] h-full">
          <LeftSidebar
            title={t("login_title")}
            description={t("login_description")}
            className="rounded-2xl w-[32rem]"
          >
            <LoginForm />
          </LeftSidebar>
        </div>
      </div>
    </>
  );
}

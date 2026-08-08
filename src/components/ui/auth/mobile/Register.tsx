/*
 * @Author: Mohammad Felfelani
 * @Email: mfelfelani72@gmail.com
 * @Date: 2025-12-29
 * @Description: Login Page - Desktop Only
 */

"use client";

// Components

import LeftSidebar from "@/components/ui/auth/common/LeftSidebar";
import RegisterForm from "@/components/ui/auth/common/register/RegisterForm";

// Hooks

import { useTranslation } from "@/hooks/app/useTranslation";

const Login = () => {
  // Hooks

  const { t } = useTranslation();

  return (
    <>
      <div className="flex flex-row h-screen w-full items-center justify-center">
        <div className="h-full flex items-center justify-center px-4">
          <LeftSidebar
            title={t("register_title")}
            description={t("register_description")}
            className="w-full h-[calc(100vh-10rem)] rounded-2xl shadow-2xl"
          >
            <RegisterForm />
          </LeftSidebar>
        </div>
      </div>
    </>
  );
};

export default Login;

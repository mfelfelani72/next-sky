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
import BrandCard from "../common/BrandCard";

const Login = () => {
  const { t } = useTranslation();
  return (
    <>
      <div className="min-h-screen fixed inset-0 bg-linear-to-br from-background via-background-light to-background flex flex-col overflow-hidden">
        <div className="absolute top-8 inset-0 mx-4 md:mx-8"></div>
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div
            className="absolute inset-0 opacity-[0.02]"
            style={{
              backgroundImage: `linear-gradient(var(--color-primary-400) 1px, transparent 1px),
                              linear-gradient(90deg, var(--color-primary-400) 1px, transparent 1px)`,
              backgroundSize: "50px 50px",
            }}
          />
          <div
            className="absolute top-0 right-0 w-96 h-96 bg-primary-400/30 rounded-full blur-3xl animate-pulse"
            style={{
              background: `radial-gradient(circle, var(--color-primary-400) 0%, transparent 70%)`,
            }}
          />
          <div
            className="absolute bottom-0 left-0 w-96 h-96 bg-primary-400/20 rounded-full blur-3xl animate-pulse"
            style={{
              animationDelay: "1s",
              background: `radial-gradient(circle, var(--color-primary-400) 0%, transparent 70%)`,
            }}
          />
        </div>
        <div className="relative h-full flex items-center justify-center py-4 md:py-0 mx-4 md:mx-8 mb-14">
          <LeftSidebar
            title={t("login_title")}
            description={t("login_description")}
            className="w-full h-[calc(100vh-10rem)] rounded-2xl shadow-2xl"
          >
            <LoginForm />
          </LeftSidebar>
        </div>
      </div>
    </>
  );
};

export default Login;

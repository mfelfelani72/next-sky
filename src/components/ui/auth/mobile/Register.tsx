/*
 * @Author: Mohammad Felfelani
 * @Email: mfelfelani72@gmail.com
 * @Date: 2025-12-29
 * @Description: Register Page - Responsive (Desktop & Mobile)
 */

"use client";

import { useTranslation } from "@/hooks/useTranslation";

// Components
import LeftSidebar from "@/components/ui/auth/common/LeftSidebar";
import RegisterForm from "@/components/ui/auth/common/register/RegisterForm";

const Register = () => {
  const { t } = useTranslation();
  return (
    <>
      <div className="fixed inset-0 bg-linear-to-br from-background via-background-light to-background flex flex-col overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage: `radial-gradient(circle at 2px 2px, var(--color-primary-400) 1px, transparent 0)`,
              backgroundSize: "20px 20px",
            }}
          />
          <div className="absolute top-0 right-0 w-40 h-40 rounded-full bg-primary-400/30 blur-3xl translate-x-1/2 -translate-y-1/2" />
          <div className="absolute bottom-0 left-0 w-40 h-40 rounded-full bg-primary-400/20 blur-3xl -translate-x-1/2 translate-y-1/2" />
        </div>
        <div className="relative h-full flex items-center justify-center mx-4 md:mx-8 py-4 md:py-0">
          <LeftSidebar
            title={t("register_title")}
            description={t("register_description")}
            className="w-full max-w-6xl h-auto md:h-[calc(100vh-6rem)] rounded-2xl shadow-2xl"
          >
            <RegisterForm />
          </LeftSidebar>
        </div>
      </div>
    </>
  );
};

export default Register;

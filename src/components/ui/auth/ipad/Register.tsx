/*
 * @Author: Mohammad Felfelani
 * @Email: mfelfelani72@gmail.com
 * @Date: 2025-12-29
 * @Description: Register Page - Desktop Only
 */

"use client";

import { useTranslation } from "@/hooks/app/useTranslation";

// Components

import LeftSidebar from "@/components/ui/auth/common/LeftSidebar";
import RegisterForm from "@/components/ui/auth/common/register/RegisterForm";

export default function Register() {
  const { t } = useTranslation();

  return (
    <>
      <div className="relative">
       
        <div className="relative inline-flex flex-row z-[120] h-full">
          <LeftSidebar
            title={t("register_title")}
            description={t("register_description")}
            className="rounded-2xl w-[32rem]"
          >
            <RegisterForm />
          </LeftSidebar>
        </div>
      </div>
    </>
  );
}

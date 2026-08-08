/*
 * @Author: Mohammad Felfelani
 * @Email: mfelfelani72@gmail.com
 * @Team:
 * @Date: 2025-12-31 07:55:26
 * @Description: Login Details - Dark text for white bg
 */

"use client";

// Components

import { Shield, Bolt, Eye } from "lucide-react";

// Hooks

import { useTranslation } from "@/hooks/app/useTranslation";

const ForgotPasswordDetails = () => {
  // Hooks

  const { t } = useTranslation();

  // Constants

  const features = [
    { icon: Shield, label: t("encrypted"), color: "text-emerald-600" },
    { icon: Bolt, label: t("fast"), color: "text-amber-600" },
    { icon: Eye, label: t("protected"), color: "text-sky-600" },
  ];

  return (
    <div className="px-1">
      {/* Features - horizontal with colors */}
      <div className="flex gap-6">
        {features.map(({ icon: Icon, label, color }) => (
          <div key={label} className="flex items-center gap-2">
            <Icon className={`h-4 w-4 ${color} xl:h-5 xl:w-5`} />
            <span className="text-xs text-gray-500 xl:text-sm">{label}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ForgotPasswordDetails;

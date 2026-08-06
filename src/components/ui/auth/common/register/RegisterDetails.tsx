/*
 * @Author: Mohammad Felfelani
 * @Email: mfelfelani72@gmail.com
 * @Team:
 * @Date: 2025-12-31 13:08:05
 * @Description:
 */

"use client";

import { useTranslation } from "@/hooks/useTranslation";
import { Zap, TrendingUp, Shield } from "lucide-react";

const RegisterDetails = () => {
  // Hooks

  const { t } = useTranslation();

  return (
    <>
      <div className="flex flex-col gap-5 text-center">
        <div>
          <div className="flex items-center justify-center gap-2 mb-2">
            <h2 className="text-2xl font-bold text-white">
              {t("register_detail_title")}
            </h2>
          </div>
          <p className="text-sm text-white/60 leading-relaxed">
            {t("register_detail_description")}
          </p>
        </div>

        <div className="flex items-center justify-center gap-5">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 border border-Neutral-200 p-2 rounded-md bg-linear-to-br from-white/10 to-white/5 inline-flex items-center justify-center">
              <Zap className="h-4 w-4 text-Neutral-50" />
            </div>
            <span className="text-sm text-white/70">{t("fast")}</span>
          </div>

          <div className="flex items-center gap-2">
            <div className="w-8 h-8 border border-Neutral-200 p-2 rounded-md bg-linear-to-br from-white/10 to-white/5 inline-flex items-center justify-center">
              <TrendingUp className="h-4 w-4 text-Neutral-50" />
            </div>
            <span className="text-sm text-white/70">{t("analysis")}</span>
          </div>

          <div className="flex items-center gap-2">
            <div className="w-8 h-8 border border-Neutral-200 p-2 rounded-md bg-linear-to-br from-white/10 to-white/5 inline-flex items-center justify-center">
              <Shield className="h-4 w-4 text-Neutral-50" />
            </div>
            <span className="text-sm text-white/70">{t("free")}</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default RegisterDetails;

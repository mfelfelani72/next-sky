/*
 * @Author: Mohammad Felfelani
 * @Email: mfelfelani72@gmail.com
 * @Team:
 * @Date: 2025-12-31 06:00:17
 * @Description: Brand Card - Clean & Minimal (Dark text for white bg)
 */
"use client";

import { useTranslation } from "@/hooks/app/useTranslation";

// Components
import Image from "@/components/base/Image";

// Functions
import { cn } from "@/libraries/app/cn";

// Interfaces
export interface BrandCardProps {
  className?: string;
}

const BrandCard: React.FC<BrandCardProps> = ({ className }) => {
  const { t } = useTranslation();

  return (
    <div
      className={cn(
        "flex flex-col items-center gap-4 text-center",
        className
      )}
    >
      {/* Logo */}
      <div className="h-16 w-16 xl:h-20 xl:w-20">
        <Image
          src="/images/svg/Logo-Website-2.svg"
          alt="Logo"
          width={80}
          height={80}
          className="h-full w-full object-contain" // ❌ حذف brightness-0 invert
        />
      </div>

      {/* Brand Name - تیره */}
      <h1 className="text-3xl font-bold tracking-tight text-gray-800 xl:text-4xl 2xl:text-5xl">
        {t("brand_name")}
      </h1>

      {/* Tagline - تیره و کمرنگ */}
      <p className="text-xs font-light text-gray-400 xl:text-sm">
        {t("your_cryptocurrency_newspaper")}
      </p>
    </div>
  );
};

export default BrandCard;
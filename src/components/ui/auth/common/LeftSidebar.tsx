/*
 * @Author: Mohammad Felfelani
 * @Email: mfelfelani72@gmail.com
 * @Team:
 * @Date: 2025-12-31 08:50:42
 * @Description: Left sidebar - Subtle Glass with dark text for white bg
 */

"use client";

import { useRouter } from "next/navigation";

// Components
import { ArrowLeft } from "lucide-react";

// Functions
import { cn } from "@/libraries/app/cn";

// Interface
interface LeftSidebarProps {
  title: string;
  description: string;
  className?: string;
  children?: React.ReactNode;
}

const LeftSidebar = ({
  title,
  description,
  className,
  children,
}: LeftSidebarProps) => {
  const router = useRouter();

  return (
    <div
      className={cn(
        "flex flex-col w-full px-6 py-5 relative overflow-hidden",
        "bg-white/3 backdrop-blur-sm",
        "border border-white/5",
        "shadow-2xl shadow-black/10",
        "ltr:rounded-l-2xl rtl:rounded-r-2xl",
        "xl:px-8 xl:py-6",
        className
      )}
    >
      {/* ✨ Soft glow highlight - increases visibility */}
      <div className="absolute inset-0 bg-linear-to-br from-white/5 via-transparent to-transparent pointer-events-none" />
      
      {/* ✨ Subtle edge glow - makes glass effect more visible */}
      <div className="absolute inset-0 rounded-l-2xl shadow-[inset_0_0_80px_rgba(255,255,255,0.03)] pointer-events-none" />

      {/* Header */}
      <header className="relative z-10 mb-4">
        <div className="flex items-center gap-3">
          {/* Back Button - Dark version */}
          <button
            onClick={() => router.back()}
            className="group flex h-8 w-8 items-center justify-center rounded-full border border-gray-200/50 bg-white/30 text-gray-400 transition-all hover:bg-white/50 hover:border-gray-300 hover:text-gray-600"
          >
            <ArrowLeft className="h-4 w-4 transition-transform group-hover:scale-110 rtl:rotate-180" />
          </button>

          {/* Title - Dark */}
          <h1 className="text-lg font-light tracking-wide text-gray-700 xl:text-xl">
            {title}
          </h1>
        </div>

        {/* Description - Dark */}
        <p className="mt-1 max-w-[24rem] text-xs text-gray-400 ltr:pl-11 rtl:pr-11 xl:text-sm">
          {description}
        </p>
      </header>

      {/* Children */}
      <div className="relative z-10 flex-1">{children}</div>
    </div>
  );
};

export default LeftSidebar;
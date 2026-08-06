/*
 * @Author: Mohammad Felfelani
 * @Email: mfelfelani72@gmail.com
 * @Team:
 * @Date: 2025-12-31 08:51:02
 * @Description: Right sidebar - Solid white background
 */

// Components

import BrandCard from "@/components/ui/auth/common/BrandCard";

// Functions

import { cn } from "@/libraries/app/cn";
interface RightSidebarProps {
  className?: string;
  children?: React.ReactNode;
}

const RightSidebar = ({ className, children }: RightSidebarProps) => {
  return (
    <div
      className={cn(
        "flex flex-col w-full px-6 py-5 relative",
        "bg-white backdrop-blur-none",
        "border border-white/20",
        "shadow-2xl shadow-black/15",
        "ltr:rounded-r-2xl rtl:rounded-l-2xl",
        "xl:px-8 xl:py-6",
        className,
      )}
    >
      <div className="absolute inset-0 bg-linear-to-br from-white/40 via-white/10 to-transparent pointer-events-none" />

      {/* Content */}
      <div className="flex-1 flex flex-col items-center justify-between p-4 z-10 relative">
        <BrandCard />
        {children}
      </div>
    </div>
  );
};

export default RightSidebar;

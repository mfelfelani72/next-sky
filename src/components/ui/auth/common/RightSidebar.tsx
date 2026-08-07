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
        "flex flex-col w-full p-2 relative",
        "bg-white/80 backdrop-blur-none",
        "border border-white/20",
        "shadow-2xl shadow-black/15",
        "ltr:rounded-r-2xl rtl:rounded-l-2xl",
        className,
      )}
    >
      <div className="absolute inset-0 bg-linear-to-br from-white/40 via-white/10 to-transparent pointer-events-none ltr:rounded-r-2xl rtl:rounded-l-2xl" />

      {/* Content */}
      <div className="flex flex-col h-full items-center justify-between z-10">
        <BrandCard />
        {children}
      </div>
    </div>
  );
};

export default RightSidebar;

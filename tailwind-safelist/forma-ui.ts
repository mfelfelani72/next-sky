/**
 * @Author: Mohammad Felfelani
 * @Email: mfelfelani72@gmail.com
 * @Team:
 * @Date: 2025-10-27 09:41:51
 * @Description:
 */
const formaUiSafelist = [
  // =========================
  // Layout & Positioning
  // =========================
  "relative",
  "absolute",
  "overflow-hidden",
  "pointer-events-none",
  "inset-y-0",
  "inset-x-0",
  "top-[-0.5rem]",
  "top-[-1.15rem]",
  "bottom-0",
  "top-0",
  "left-0",
  "right-0",
  "absolute", // اضافه شد
  "inset-0", // اضافه شد

  // RTL / LTR positioning
  "rtl:left-0",
  "ltr:right-0",
  "rtl:right-0",
  "ltr:left-0",
  "rtl:left-4",
  "ltr:right-4",
  "rtl:right-3",
  "ltr:left-3",
  "ltr:right-[-0.525rem]",
  "rtl:left-[-0.625rem]",
  "rtl:pl-[2.5rem]", // اضافه شد
  "ltr:pr-[2.5rem]", // اضافه شد
  "rtl:pr-3", // اضافه شد
  "ltr:pl-3", // اضافه شد

  // =========================
  // Flexbox
  // =========================
  "flex",
  "flex-row",
  "flex-col",
  "inline-flex",
  "items-start",
  "items-center",
  "justify-between",
  "self-center",
  "justify-center",
  "flex-col-reverse",
  "flex-row-reverse",

  // =========================
  // Sizing
  // =========================
  "w-full",
  "w-96",
  "w-80",
  "w-40",
  "w-11",
  "w-6",
  "w-5",
  "w-4",
  "w-[4rem]",
  "w-[2.5rem]",
  "w-[1.5rem]",
  "w-[1.875rem]", // اضافه شد
  "h-full",
  "h-40",
  "h-12",
  "h-11",
  "h-6",
  "h-5",
  "h-4",
  "h-1",
  "h-[2rem]",
  "h-[2.5rem]",
  "h-[1.5rem]",
  "h-[1.875rem]", // اضافه شد

  // =========================
  // Spacing
  // =========================
  "p-2",
  "p-4",
  "px-3",
  "px-[1rem]",
  "px-[2.7rem]",
  "py-3",
  "py-4",
  "mt-1",
  "mt-2",
  "mt-4",
  "mt-8",
  "mb-1",
  "mb-4",
  "mx-3",
  "gap-2",
  "start-[2px]", // اضافه شد

  // RTL / LTR padding
  "rtl:pl-[2.5rem]",
  "ltr:pr-[2.5rem]",
  "rtl:pr-3",
  "ltr:pl-3",
  "rtl:pr-11",
  "ltr:pl-11",
  "rtl:pl-12",
  "ltr:pr-12",
  "rtl:pr-11", // اضافه شد
  "ltr:pl-11", // اضافه شد
  "rtl:pl-12", // اضافه شد
  "ltr:pr-12", // اضافه شد
  "rtl:left-0", // اضافه شد
  "ltr:right-0", // اضافه شد

  // =========================
  // Borders & Radius
  // =========================
  "border",
  "border-2",
  "border-Neutral-50",
  "border-Neutral-300",
  "border-secondary-100",
  "border-secondary-400",
  "rounded-full",
  "rounded-2xl",
  "rounded-sm",
  "rounded-[20px]",
  "rounded-[10rem]",
  "!border-Error-400",
  "!focus:border-Error-400",
  "border-gray-300", // اضافه شد
  "dark:border-gray-600", // اضافه شد

  // =========================
  // Background Colors
  // =========================
  "bg-white",
  "bg-black",
  "bg-secondary-50",
  "bg-background-light",
  "bg-background",
  "bg-violet-300/30",
  "bg-Neutral-100",
  "bg-Neutral-400/50",
  "bg-neutral-800",
  "bg-neutral-500",
  "bg-gray-200",
  "bg-gray-700",
  "bg-primary-400",
  "bg-transparent", // اضافه شد
  "dark:bg-transparent", // اضافه شد
  "peer-checked:bg-primary-400", // اضافه شد
  "dark:peer-checked:bg-primary-400", // اضافه شد

  // =========================
  // Text
  // =========================
  "text-base",
  "text-sm",
  "text-xs",
  "font-medium",
  "font-semibold",
  "leading-tight",
  "tracking-tight",
  "text-gray-600",
  "text-Neutral-500",
  "text-Neutral-400",
  "text-Neutral-300",
  "text-Neutral-200",
  "text-Neutral-100",
  "text-Error-400",
  "text-white",
  "text-[10px]", // اضافه شد
  "fill-white", // اضافه شد
  "fill-black", // اضافه شد
  "peer-checked:fill-black", // اضافه شد

  // =========================
  // Inputs / Forms
  // =========================
  "appearance-none",
  "placeholder-Neutral-200",
  "peer",
  "peer-focus:hidden",
  "peer-invalid:flex",
  "peer-checked:bg-white",
  "peer-checked:bg-primary-400",
  "peer-checked:opacity-60",
  "peer-checked:after:translate-x-full",
  "rtl:peer-checked:after:-translate-x-full",
  "peer-checked:after:border-white",
  "checked:!bg-primary-400",
  "checked:!border-primary-400",
  "invalid:border-Error-400",
  "invalid:focus:border-Error-400",
  "sr-only", // اضافه شد
  "peer-checked:after:inputTranslate-x-[-100%]", // اضافه شد - خطا در نام کلاس
  "peer-checked:after:translate-x-[-100%]", // اضافه شد - نسخه اصلاح شده
  "rtl:peer-checked:after:-translate-x-full", // اضافه شد
  "checked:after:opacity-100", // اضافه شد
  "peer-checked:after:opacity-100", // اضافه شد

  // =========================
  // Focus / Ring
  // =========================
  "focus:outline-none",
  "focus:ring-0",
  "focus:ring-offset-0",
  "focus:border-secondary-400",
  "focus-visible:outline",
  "focus-visible:outline-white",
  "peer-focus:ring-2",
  "peer-focus:ring-primary-300",
  "dark:peer-focus:ring-primary-300", // اضافه شد

  // =========================
  // Cursor & Interaction
  // =========================
  "cursor-pointer",
  "select-none",

  // =========================
  // Transition & Animation
  // =========================
  "transition-all",
  "transition-transform",
  "duration-300",
  "duration-500",
  "duration-700",
  "ease-in-out",
  "animate-bounce",
  "after:duration-500", // اضافه شد

  // =========================
  // Transform
  // =========================
  "rotate-90",
  "rotate-180",
  "-translate-y-2",
  "translate-y-0",
  "translate-y-full",
  "-translate-y-full",
  "translate-x-full",
  "-translate-x-full",
  "scale-95",
  "scale-100",
  "peer-checked:after:translate-x-full", // اضافه شد
  "rtl:peer-checked:after:-translate-x-full", // اضافه شد

  // =========================
  // Opacity
  // =========================
  "opacity-0",
  "opacity-30",
  "opacity-50",
  "opacity-60",
  "opacity-70",
  "opacity-100",
  "peer-checked:opacity-70", // اضافه شد

  // =========================
  // Height & Filters
  // =========================
  "max-h-0",
  "max-h-screen",
  "blur-2xl",

  // =========================
  // Shadow
  // =========================
  "shadow-sm",
  "shadow-md",
  "after:shadow-md", // اضافه شد

  // =========================
  // Dark Mode
  // =========================
  "dark:bg-background-light",
  "dark:bg-gray-700",
  "dark:border-Neutral-400/50",
  "dark:text-white",
  "dark:text-Neutral-100",
  "dark:peer-checked:bg-primary-400",
  "dark:bg-transparent", // اضافه شد
  "dark:border-background-light", // اضافه شد
  "dark:peer-checked:bg-background", // اضافه شد

  // =========================
  // Z-index & Display
  // =========================
  "z-10",
  "z-30",
  "z-[1000]",
  "hidden",

  // =========================
  // Pseudo-elements (after/before)
  // =========================
  "after:content-['']", // اضافه شد
  "after:absolute", // اضافه شد
  "after:inset-0", // اضافه شد
  "after:w-[1.5rem]", // اضافه شد
  "after:h-[1.5rem]", // اضافه شد
  "after:rounded-full", // اضافه شد
  "after:top-[0.25rem]", // اضافه شد
  "after:left-[0.25rem]", // اضافه شد
  "after:bg-[linear-gradient(to_right,_#444350,_#444350)]", // اضافه شد
  "peer-checked:after:bg-[linear-gradient(to_right,_#f97316,_#facc15)]", // اضافه شد
  "active:after:w-[1.875rem]", // اضافه شد
  "peer-checked:after:left-[3.75rem]", // اضافه شد
  "after:bg-no-repeat", // اضافه شد
  "after:bg-center", // اضافه شد
  "after:opacity-0", // اضافه شد
  "after:transition-all", // اضافه شد
  "after:top-0.5", // اضافه شد
  "after:bg-white", // اضافه شد
  "after:border-gray-300", // اضافه شد
  "after:border", // اضافه شد
  "after:rounded-full", // اضافه شد
  "after:h-5", // اضافه شد
  "after:w-5", // اضافه شد

  // =========================
  // Background Gradients
  // =========================
  "bg-[linear-gradient(to_right,_#444350,_#444350)]", // اضافه شد
  "peer-checked:bg-[linear-gradient(to_right,_#f97316,_#facc15)]", // اضافه شد
] as const;

export default formaUiSafelist;
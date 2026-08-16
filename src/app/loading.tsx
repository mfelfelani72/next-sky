/*
 * @Author: Mohammad mfelfelani72@gmail.com
 * @Date: 2026-02-24 08:03:11
 * @LastEditTime: 2026-06-19 20:57:01
 * @Description:
 */

"use client";

import { useTranslation } from "@/hooks/app/useTranslation";

// Functions

import { cn } from "forma-li";

// Interfaces

interface LoadingProps {
  className?: string;
}

// Zustand

import { useLangStore } from "forma-li";
import { useEffect, useState } from "react";

export default function Loading({ className }: LoadingProps) {
  // Hooks

  const { dir } = useLangStore();

  const { t } = useTranslation();

  // States

  const [logosharp, setLogosharp] = useState<string>("");

  // Functions

  useEffect(() => {
    try {
      const licenseName = process.env.NEXT_PUBLIC_LICENSE_NAME || "sky";
      const logoModule = require(`../../public/${licenseName}/logo`);
      setLogosharp(logoModule.logosharp || logoModule.default || "");
    } catch (error) {
      console.error("Error loading logo:", error);
      try {
        const defaultLogo = require(`../../public/sky/logo`);
        setLogosharp(defaultLogo.logosharp || defaultLogo.default || "");
      } catch (e) {
        setLogosharp("");
      }
    }
  }, []);

  return (
    <div
      className={cn(
        `fixed top-0 left-0 w-full h-full flex flex-col justify-center items-center bg-Neutral-50`,
        className,
      )}
    >
      <pre className="text-[0.1rem] leading-[0.1rem] text-primary-300 my-4 select-none font-mono ">
        {logosharp}
      </pre>
      <div className="text-lg font-bold text-primary-600 drop-shadow-sm">
        {t(process.env.NEXT_PUBLIC_LICENSE_NAME || "")}
      </div>

      <div className="w-40 mt-1">
        <div className="flex gap-1">
          <div className="h-0.5 w-full bg-primary-50 rounded-full overflow-hidden">
            <div
              className="h-full bg-primary-500 rounded-full"
              style={{
                animation: `${dir === "rtl" ? "xpWave-right" : "xpWave-left"} 1.5s ease-in-out infinite`,
                width: "55%",
              }}
            />
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes xpWave-left {
          0% {
            transform: translateX(-20%);
          }
          50% {
            transform: translateX(100%);
          }
          100% {
            transform: translateX(-20%);
          }
        }

        @keyframes xpWave-right {
          0% {
            transform: translateX(-100%);
          }
          50% {
            transform: translateX(20%);
          }
          100% {
            transform: translateX(-100%);
          }
        }
      `}</style>
    </div>
  );
}

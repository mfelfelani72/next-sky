/*
 * @Author: Mohammad mfelfelani72@gmail.com
 * @Date: 2026-02-13 19:36:36
 * @LastEditors: Mohammad mfelfelani72@gmail.com
 * @LastEditTime: 2026-04-22 16:12:18
 * @FilePath: /next-aimoonhub-dev/src/app/[lang]/LangWrapper.tsx
 * @Description:
 */
"use client";

import { useEffect, useState } from "react";

// Components

// Interfaces

import { LangWrapperProps } from "forma-li";

// Hooks

import { useServiceWorker } from "@/hooks/app/useServiceWorker";

// Zustand

import { useLangStore } from "forma-li";
import { useTranslation } from "@/hooks/app/useTranslation";

export default function LayoutWrapper({
  langFromUrl,
  children,
}: LangWrapperProps) {
  // Hooks

  const { lang, dir, setLang, triggerRefresh } = useLangStore();

  // States

  const [loaded, setLoaded] = useState(false);

  // Hooks

  useServiceWorker();

  // Functions

  useEffect(() => {
    // for nextjs async
    localStorage.setItem("firstLoad", "true");

    if (lang !== langFromUrl) {
      setLang(langFromUrl);
      triggerRefresh?.();
    }

    setLoaded(true);
  }, [langFromUrl, setLang, lang, triggerRefresh]);

  useEffect(() => {
    if (lang == langFromUrl) console.log("App Language is : ", lang);
  }, []);
  if (!loaded) return null;

  return (
    <div lang={lang} dir={dir} className="">
      {children}
    </div>
  );
}

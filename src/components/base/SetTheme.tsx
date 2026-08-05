/*
 * @Author: Mohammad Felfelani
 * @Email: mfelfelani72@gmail.com
 * @Team:
 * @Date: 2025-12-16 09:43:05
 * @Description:
 */

"use client";

import { useEffect, useMemo } from "react";

// Hooks

import { useTheme } from "@/hooks/app/useTheme";

// Interfaces

interface SetThemeDarkLightProps {
  theme: "light" | "dark" | "local";
}

const SetThemeDarkLight = ({ theme }: SetThemeDarkLightProps) => {
  // Hooks

  const { setTheme } = useTheme();

  // Functions

  const getThemeFromLocalStorage = (): "light" | "dark" | null => {
    if (typeof window === "undefined") return null;

    try {
      const appStoreStr = localStorage.getItem("app-store");
      if (!appStoreStr) return null;

      const appStore = JSON.parse(appStoreStr);
      return appStore.state?.theme || null;
    } catch (error) {
      console.error("Error reading theme from localStorage:", error);
      return null;
    }
  };

  const finalTheme = useMemo(() => {
    if (theme === "local") {
      const localTheme = getThemeFromLocalStorage();
      return localTheme || "light";
    }
    return theme;
  }, [theme]);

  useEffect(() => {
    if (finalTheme) {
      setTheme(finalTheme);
    }
  }, [finalTheme, setTheme]);

  return null;
};

export default SetThemeDarkLight;

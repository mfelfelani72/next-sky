/**
 * @Author: Mohammad Felfelani
 * @Email: mfelfelani72@gmail.com
 * @Team:
 * @Date: 2025-12-16 09:40:51
 * @Description:
 */
/*
 * @Author: Mohammad Felfelani
 * @Email: mfelfelani72@gmail.com
 * @Team:
 * @Date: 2025-12-16 09:40:51
 * @Description:
 */

"use client";

import { useCallback } from "react";

export const useTheme = () => {
  const setTheme = useCallback((theme: "light" | "dark"): void => {
    if (typeof document === "undefined") return;

    const expires = new Date();
    expires.setFullYear(expires.getFullYear() + 1);

    const themeData = JSON.stringify({ state: { theme } });

    document.cookie = `app_theme=${themeData}; expires=${expires.toUTCString()}; path=/; sameSite=lax`;

    document.documentElement.className = theme;
  }, []);

  return { setTheme };
};

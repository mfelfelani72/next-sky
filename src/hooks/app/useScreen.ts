/*
 * @Author: Mohammad Felfelani
 * @Email: mfelfelani72@gmail.com
 * @Team:
 * @Date: 2025-12-17 09:44:45
 * @Description:
 */

"use client";

import { useState, useEffect, useCallback } from "react";

// Configures

import { BREAKPOINTS } from "@/configs/app/app";

export const useScreen = (debounceDelay = 150) => {
  const [width, setWidth] = useState<number | null>(null);

  const handleResize = useCallback(() => {
    setWidth(window.innerWidth);
  }, []);

  useEffect(() => {
    handleResize();

    let timeoutId: NodeJS.Timeout;
    const debouncedResize = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(handleResize, debounceDelay);
    };

    window.addEventListener("resize", debouncedResize);

    return () => {
      window.removeEventListener("resize", debouncedResize);
      clearTimeout(timeoutId);
    };
  }, [handleResize, debounceDelay]);

  if (width === null) return null;

  if (width > BREAKPOINTS.EXTRA_LARGE) return "extraLarge";
  if (width > BREAKPOINTS.LARGE) return "large";
  if (width > BREAKPOINTS.MEDIUM) return "medium";
  if (width > BREAKPOINTS.SMALL) return "small";
  return "other";
};

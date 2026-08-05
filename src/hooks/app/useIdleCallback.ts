/**
 * @Author: Mohammad Felfelani
 * @Email: mfelfelani72@gmail.com
 * @Team:
 * @Date: 2025-10-07 06:31:56
 * @Description:
 */

"use client";

import { useEffect } from "react";

export const useIdleCallback = (cb: () => void, deps: any[] = []) => {
  useEffect(() => {
    if ("requestIdleCallback" in window) {
      const id = (window as any).requestIdleCallback(cb, { timeout: 2000 });
      return () => (window as any).cancelIdleCallback(id);
    } else {
      const id = setTimeout(cb, 500);
      return () => clearTimeout(id);
    }
  }, deps);
};
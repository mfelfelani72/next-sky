/**
 * @Author: Mohammad Felfelani
 * @Email: mfelfelani72@gmail.com
 * @Team:
 * @Date: 2025-10-07 06:31:56
 * @Description:
 */

"use client";

import { useEffect, useState } from "react";

export const useNetworkSpeed = () => {
  const [fast, setFast] = useState(true);

  useEffect(() => {
    const conn = (navigator as any)?.connection;
    if (!conn) return;

    const slow =
      conn.effectiveType === "2g" ||
      conn.effectiveType === "slow-2g" ||
      conn.saveData;

    setFast(!slow);
  }, []);

  return fast;
};

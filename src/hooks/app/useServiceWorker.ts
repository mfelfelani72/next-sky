/*
 * @Author: Mohammad Felfelani
 * @Email: mfelfelani72@gmail.com
 * @Team:
 * @Date: 2025-12-17 09:44:45
 * @Description:
 */

"use client"

import { useEffect } from "react";

export function useServiceWorker() {
  useEffect(() => {
    const registerServiceWorker = async () => {
      if (!("serviceWorker" in navigator)) {
        console.log(
          "Service worker not installed: Browser does not support service workers",
        );

        return;
      }

      try {
        // Register service worker
        const registration = await navigator.serviceWorker.register("/scripts/sw.js");

        // Check installation status
        if (registration.installing) {
          console.log("Service worker is installing...");

          registration.installing.addEventListener("statechange", (e) => {
            if (e.target && "state" in e.target) {
              const state = (e.target as any).state;
              if (state === "installed") {
                console.log("Service worker successfully installed!");
              } else if (state === "redundant") {
                console.log("Service worker installation failed");
              }
            }
          });
        } else if (registration.waiting) {
          console.log(
            "Service worker already installed and waiting for activation",
          );
        } else if (registration.active) {
          console.log("Service worker is active");
        }
      } catch (error) {
        const errorMessage =
          error instanceof Error ? error.message : "Unknown error";
        console.log(`Service worker not installed: ${errorMessage}`);
      }
    };

    registerServiceWorker();
  }, []);
}

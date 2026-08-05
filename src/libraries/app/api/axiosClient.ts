/**
 * @Author: Mohammad Felfelani
 * @Email: mfelfelani72@gmail.com
 * @Team: Pouya Soltani (Cosmic Cat)
 * @Date: 2025-10-14 09:17:37
 * @Description:
 */

import axios from "axios";

// Functions

import { getCookie, getCookieServer } from "@/utilities/app/cookieUtils";

// Constants

const isSSR = typeof window === "undefined";
const isProduction = process.env.NODE_ENV === "production";

const baseUrlSSR = (process.env.NEXT_PUBLIC_API_URL ?? "") + "/";

const baseUrlCSR =
  isProduction && !isSSR
    ? (process.env.NEXT_PUBLIC_BASE_URL ?? "") +
      (process.env.NEXT_PUBLIC_BASE_PORT ?? "") +
      (process.env.NEXT_PUBLIC_BASE_PATH ?? "")
    : (process.env.NEXT_PUBLIC_BASE_URL ?? "") +
      (process.env.NEXT_PUBLIC_BASE_PORT ?? "");

const baseURL = isSSR ? baseUrlSSR : baseUrlCSR;

const axiosClient = axios.create({
  baseURL,
  headers: {
    "Accept-Version": 1,
    Accept: "application/json",
    "Content-Type": "application/json; charset=utf-8",
  },
  // withCredentials: isSSR && isProduction,
  // withXSRFToken: isSSR && isProduction,
  withCredentials: isProduction,
  withXSRFToken: isProduction,
});

axiosClient.interceptors.request.use(async (config) => {
  try {
    let token = process.env.NEXT_PUBLIC_AUTHORIZATION;
    // CSR
    if (!isSSR) {
      const cookie = getCookie("app_key");

      if (cookie) {
        const appKey = JSON.parse(decodeURIComponent(cookie));
        token = appKey?.tk ?? token;
      }
    }
    // SSR
    else {
      try {
        const cookieStore = await getCookieServer("app_key");

        if (cookieStore) {
          const appKey = JSON.parse(decodeURIComponent(cookieStore));
          token = appKey?.tk ?? token;
        }
      } catch {
        // ignore if outside request scope
      }
    }

    if (token) {
      config.headers.Authorization = token;
    }
  } catch (error) {
    console.error("Axios token attach error:", error);
  }

  return config;
});

export default axiosClient;

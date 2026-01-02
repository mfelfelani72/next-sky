/**
 * @Author: Mohammad Felfelani
 * @Email: mfelfelani72@gmail.com
 * @Team:
 * @Date: 2025-10-06 15:14:10
 * @Description:
 */

export const isBrowser = (): boolean => {
  return typeof window !== "undefined" && typeof document !== "undefined";
};

export const setCookie = (
  name: string,
  value: string,
  options?: {
    minutes?: number;
    days?: number;
    secure?: boolean;
  }
): void => {
  if (!isBrowser()) return;

  const expires = new Date();

  if (options?.minutes) {
    expires.setTime(expires.getTime() + options.minutes * 60 * 1000);
  } else if (options?.days) {
    expires.setDate(expires.getDate() + options.days);
  } else {
    expires.setFullYear(expires.getFullYear() + 1);
  }

  document.cookie = `
    ${name}=${value};
    expires=${expires.toUTCString()};
    path=/;
    SameSite=Lax;
    ${options?.secure ? "Secure;" : ""}
  `.trim();
};

export const getCookie = (name: string): string | null => {
  if (!isBrowser()) return null;

  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) {
    return parts.pop()?.split(";").shift() || null;
  }
  return null;
};

export const getCookieServer = async (name: string): Promise<string | null> => {
  try {
    const { cookies } = await import("next/headers");
    const cookieStore = await cookies();
    return cookieStore.get(name)?.value || null;
  } catch (error) {
    console.error("Error getting cookie from server:", error);
    return null;
  }
};

export const getCookieAppLang = async (): Promise<{
  lang: string;
  dir: string;
}> => {
  let lang = "en";
  let dir = "ltr";

  let appLangCookie: string | null = null;

  try {
    if (typeof window === "undefined") {
      // Server-side
      const { cookies } = await import("next/headers");
      const cookieStore = await cookies();
      appLangCookie = cookieStore.get("app_lang")?.value || null;
    } else {
      // Client-side
      const cookies = document.cookie.split(";");
      const cookie = cookies.find((c) => c.trim().startsWith("app_lang="));
      appLangCookie = cookie ? decodeURIComponent(cookie.split("=")[1]) : null;
    }

    if (appLangCookie) {
      const appLangData = JSON.parse(appLangCookie);
      lang = appLangData.state?.lang || "en";
      dir = appLangData.state?.dir || "ltr";
    }
  } catch (error) {
    console.error("Error in getCookieAppLang:", error);
  }

  return { lang, dir };
};

export const getCookieAppTheme = async (): Promise<"light" | "dark"> => {
  let theme: "light" | "dark" = "light";

  try {
    const { cookies } = await import("next/headers");
    const cookieStore = await cookies();
    const cookieThemeRaw =
      cookieStore.get("app_theme")?.value || '{"state":{"theme":"light"}}';
    const parsed = JSON.parse(cookieThemeRaw);
    theme = parsed.state?.theme === "dark" ? "dark" : "light";
  } catch (error) {
    console.error("Error getting theme from cookie:", error);
  }

  return theme;
};

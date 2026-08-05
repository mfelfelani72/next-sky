/**
 * @Author: Mohammad Felfelani
 * @Email: mfelfelani72@gmail.com
 * @Team:
 * @Date: 2025-12-14 13:04:18
 * @Description:
 */

export const isLoginClient = (): boolean => {
  if (typeof window === "undefined") return false;

  return document.cookie.includes("app_key=");
};

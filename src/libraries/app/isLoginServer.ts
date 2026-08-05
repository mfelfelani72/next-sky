/**
 * @Author: Mohammad Felfelani
 * @Email: mfelfelani72@gmail.com
 * @Team:
 * @Date: 2025-12-29 07:47:35
 * @Description:
 */

import { cookies } from "next/headers";

export const isLoginServer = async (): Promise<boolean> => {
  const cookieStore = await cookies();
  return cookieStore.has("app_key");
};

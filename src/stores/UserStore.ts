/**
 * @Author: Mohammad Felfelani
 * @Email: mfelfelani72@gmail.com
 * @Team:
 * @Date: 2025-10-18 07:09:52
 * @Description:
 */

import { create } from "zustand";

// Constants

import { API_USER } from "@/constants/user/endpoints";

// Functions

import { cns } from "@/libs/api/cns";
import { getCookie } from "@/libs/cookieUtils";

// Interfaces
interface UserState {
  user: any;
  isLoading: boolean;
  setUser: (value: any) => void;
  fetchUserFromCookie: () => Promise<void>;
}

export const useUserStore = create<UserState>((set) => ({
  user: null,
  isLoading: true,

  setUser: (value) => set({ user: value }),

  fetchUserFromCookie: async () => {
    if (typeof window === "undefined") {
      set({ isLoading: false });
      return;
    }

    try {
      const cookie = getCookie("app_key");

      if (cookie && cookie.length > 0) {
        const appKey = JSON.parse(decodeURIComponent(cookie));

        const result: any = await cns({
          method: "post",
          endPoint: API_USER,
          route: "/getUser",
          body: {
            action: "GetUserbyUUID",
            uuid: appKey.ud,
          },
        });

        if (result?.data?.return) {
          set({ user: result.data.user, isLoading: false });
        } else {
          set({ user: null, isLoading: false });
        }
      } else {
        set({ user: null, isLoading: false });
      }
    } catch (error) {
      console.error("Error parsing cookie:", error);
      set({ user: null, isLoading: false });
    }
  },
}));

/**
 * @Author: Mohammad Felfelani
 * @Email: mfelfelani72@gmail.com
 * @Team:
 * @Date: 2025-10-18 07:09:52
 * @Description: Combined App & Theme Store with JSON cookie persistence
 */

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { isBrowser, setCookie, getCookie } from "@/libs/cookieUtils";

// Types

type Theme = "light" | "dark";

interface ThemeState {
  theme: Theme;
  isInitialized: boolean;
  setTheme: (newTheme: Theme) => void;
  toggleTheme: () => void;
  initializeTheme: () => void;
}

interface LoadingState {
  loading: boolean;
  setLoading: (value: boolean) => void;
}

interface DeviceState {
  device: string;
  setDevice: (value: string) => void;
}

interface AutoRefreshState {
  autoRefresh: boolean | string;
  setAutoRefresh: (value: boolean | string) => void;
}

interface HeaderState {
  headerLeftButtonFunction: (() => void) | null;
  setHeaderLeftButtonFunction: (newFunction: (() => void) | null) => void;

  headerLeftButtonChildren: React.ReactNode | string;
  setHeaderLeftButtonChildren: (children: React.ReactNode) => void;

  headerRightButtonFunction: (() => void) | null;
  setHeaderRightButtonFunction: (newFunction: (() => void) | null) => void;

  headerRightButtonChildren: React.ReactNode | string;
  setHeaderRightButtonChildren: (children: React.ReactNode) => void;
}

type AppState = ThemeState &
  LoadingState &
  DeviceState &
  AutoRefreshState &
  HeaderState;

// Storage helper

const themeStorage = {
  getItem: (name: string): string | null => {
    if (!isBrowser()) return null;
    try {
      return localStorage.getItem(name);
    } catch (error) {
      console.error("Error reading from storage:", error);
      return null;
    }
  },
  setItem: (name: string, value: string): void => {
    if (!isBrowser()) return;
    try {
      localStorage.setItem(name, value);
    } catch (error) {
      console.error("Error writing to storage:", error);
    }
  },
  removeItem: (name: string): void => {
    if (!isBrowser()) return;
    try {
      localStorage.removeItem(name);
    } catch (error) {
      console.error("Error removing from storage:", error);
    }
  },
};

// Store

export const useAppStore = create<AppState>()(
  persist(
    (set, get) => ({
      // Theme
      theme: "light",
      isInitialized: false,
      setTheme: (newTheme: Theme) => {
        set({ theme: newTheme });
        if (isBrowser()) {
          const themeCookieValue = JSON.stringify({
            state: { theme: newTheme },
          });
          setCookie("app_theme", themeCookieValue);
        }
      },
      toggleTheme: () => {
        const { theme } = get();
        const newTheme = theme === "light" ? "dark" : "light";
        set({ theme: newTheme });
        if (isBrowser()) {
          const themeCookieValue = JSON.stringify({
            state: { theme: newTheme },
          });
          setCookie("app_theme", themeCookieValue);
        }
      },
      initializeTheme: () => {
        const { isInitialized } = get();
        if (isInitialized) return;
        if (isBrowser()) {
          const savedThemeCookie = getCookie("app_theme");
          if (savedThemeCookie) {
            try {
              const parsed = JSON.parse(savedThemeCookie);
              if (
                parsed.state?.theme === "light" ||
                parsed.state?.theme === "dark"
              ) {
                set({ theme: parsed.state.theme });
              }
            } catch (error) {
              console.error("Error parsing theme cookie:", error);
            }
          }
        }
        set({ isInitialized: true });
      },

      // Loading
      loading: false,
      setLoading: (value) => set({ loading: value }),

      // Device
      device: "",
      setDevice: (value) => set({ device: value }),

      // Auto Refresh
      autoRefresh: (() => {
        if (!isBrowser()) return false;
        const storedValue = localStorage.getItem("autoRefresh");
        if (storedValue === null) return false;

        if (storedValue === "true") return true;
        if (storedValue === "false") return false;

        return storedValue;
      })(),
      setAutoRefresh: (value) => set({ autoRefresh: value }),

      // Header
      headerLeftButtonFunction: null,
      setHeaderLeftButtonFunction: (newFunction) =>
        set({ headerLeftButtonFunction: newFunction }),

      headerLeftButtonChildren: "<div>left</div>",
      setHeaderLeftButtonChildren: (children) =>
        set({ headerLeftButtonChildren: children }),

      headerRightButtonFunction: null,
      setHeaderRightButtonFunction: (newFunction) =>
        set({ headerRightButtonFunction: newFunction }),

      headerRightButtonChildren: "<div>right</div>",
      setHeaderRightButtonChildren: (children) =>
        set({ headerRightButtonChildren: children }),
    }),
    {
      name: "app-store",
      storage: createJSONStorage(() => themeStorage),
      partialize: (state) => ({
        theme: state.theme,
        isInitialized: state.isInitialized,
        loading: state.loading,
        device: state.device,
        autoRefresh: state.autoRefresh,
        headerLeftButtonFunction: state.headerLeftButtonFunction,
        headerLeftButtonChildren: state.headerLeftButtonChildren,
        headerRightButtonFunction: state.headerRightButtonFunction,
        headerRightButtonChildren: state.headerRightButtonChildren,
      }),
    }
  )
);

// Helper to initialize theme outside of React components
export const initializeTheme = (): void => {
  if (isBrowser()) {
    useAppStore.getState().initializeTheme();
  }
};

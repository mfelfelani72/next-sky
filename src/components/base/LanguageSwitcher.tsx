/*
 * @Author: Mohammad Felfelani
 * @Email: mfelfelani72@gmail.com
 * @Team:
 * @Date: 2025-10-08 10:10:51
 * @Description: Language Switcher with Glassmorphism Style
 */

"use client";

import { useRouter, usePathname } from "next/navigation";
import { useState, useRef, useEffect } from "react";

// Components

import { LanguageIcon } from "forma-ui";

// Zustand

import { useLangStore } from "@/stores/LangStore";

// Interfaces

import {
  languages,
  type Lang,
  getNativeName,
  getFlag,
} from "@/configs/app/language";

export default function LanguageSwitcher() {
  // Hooks

  const router = useRouter();
  const pathname = usePathname();

  // States

  const { lang, setLang } = useLangStore();

  const [pendingLang, setPendingLang] = useState<Lang | null>(null);

  // States and Refs

  const [isOpen, setIsOpen] = useState(false);
  const [menuPos, setMenuPos] = useState({
    top: 0,
    left: 0,
    width: 0,
    position: "bottom" as "top" | "bottom" | "left" | "right",
  });
  const btnRef = useRef<HTMLButtonElement | null>(null);
  const menuRef = useRef<HTMLDivElement | null>(null);

  // Functions

  const getNewPath = (newLang: Lang) => {
    const segments = pathname.split("/").filter(Boolean);
    if (segments.length > 0 && segments[0] in languages) {
      segments[0] = newLang;
    } else {
      segments.unshift(newLang);
    }
    return "/" + segments.join("/");
  };

  const handleChange = (newLang: Lang) => {
    if (newLang === lang) return;
    const newPath = getNewPath(newLang);

    setPendingLang(newLang);

    setIsOpen(false);

    router.replace(newPath);
  };

  useEffect(() => {
    if (pendingLang && pathname) {
      const currentLangFromUrl = pathname.split("/").filter(Boolean)[0] as Lang;
      if (currentLangFromUrl === pendingLang) {
        setLang(pendingLang);
        setPendingLang(null);
      }
    }
  }, [pathname, pendingLang, setLang]);

  useEffect(() => {
    if (isOpen && btnRef.current) {
      const rect = btnRef.current.getBoundingClientRect();
      const menuWidth = rect.width + 50;
      const menuHeight = Object.keys(languages).length * 48 + 16;

      let left = rect.left - 25;
      let horizontalPosition: "left" | "right" = "left";

      if (left + menuWidth > window.innerWidth) {
        left = window.innerWidth - menuWidth - 10;
        horizontalPosition = "right";
      }

      if (left < 10) {
        left = 10;
      }

      let top = rect.bottom + 8;
      let verticalPosition: "top" | "bottom" = "bottom";

      if (top + menuHeight > window.innerHeight - 10) {
        top = rect.top - menuHeight - 16;
        verticalPosition = "top";
      }

      if (top < 10) {
        top = 10;
      }

      setMenuPos({
        top,
        left,
        width: menuWidth,
        position: verticalPosition === "top" ? "top" : "bottom",
      });
    }
  }, [isOpen]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        btnRef.current &&
        !btnRef.current.contains(event.target as Node) &&
        menuRef.current &&
        !menuRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const getMenuAnimationClass = () => {
    switch (menuPos.position) {
      case "top":
        return "origin-bottom scale-95";
      case "bottom":
      default:
        return "origin-top scale-95";
    }
  };

  return (
    <div className="relative inline-block">
      {/* ========== BUTTON (Glassmorphism) ========== */}
      <button
        ref={btnRef}
        onClick={() => setIsOpen((prev) => !prev)}
        className="flex items-center gap-2 px-3 py-1.5 rounded-lg transition-all duration-300 cursor-pointer
                   bg-white/10 dark:bg-Neutral-700/40
                   backdrop-blur-md backdrop-saturate-150
                   border border-white/40 dark:border-Neutral-600/30
                   shadow-[0_8px_32px_rgba(0,0,0,0.08)] dark:shadow-[0_8px_32px_rgba(0,0,0,0.3)]
                   hover:bg-white/50 dark:hover:bg-Neutral-600/50
                   hover:shadow-[0_8px_32px_rgba(0,0,0,0.12)] dark:hover:shadow-[0_8px_32px_rgba(0,0,0,0.4)]
                   hover:border-white/60 dark:hover:border-Neutral-500/40"
      >
        <span className="text-md">
          <LanguageIcon className="text-Neutral-100" />
        </span>

        <svg
          className={`w-4 h-4 text-Neutral-100 transition-transform duration-300 ${
            isOpen ? "rotate-180" : ""
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      {/* ========== DROPDOWN MENU (Glassmorphism) ========== */}
      {isOpen && (
        <div
          ref={menuRef}
          className={`fixed py-2 rounded-xl transition-all duration-200 transform ${getMenuAnimationClass()}
                     bg-white/70 dark:bg-Neutral-800/50
                     backdrop-blur-xl backdrop-saturate-150
                     border border-white/50 dark:border-Neutral-600/30
                     shadow-[0_20px_60px_rgba(0,0,0,0.15)] dark:shadow-[0_20px_60px_rgba(0,0,0,0.4)]
                     before:absolute before:inset-0 before:rounded-xl before:pointer-events-none
                     before:bg-linear-to-br before:from-white/20 before:to-transparent before:opacity-50`}
          style={{
            top: menuPos.top,
            left: menuPos.left,
            width: menuPos.width,
          }}
        >
          {Object.keys(languages).map((l) => {
            const currentLang = l as Lang;
            const isActive = currentLang === lang;
            return (
              <button
                key={currentLang}
                onClick={() => handleChange(currentLang)}
                disabled={isActive}
                className={`w-full flex items-center gap-3 px-4 py-3 text-left transition-all duration-200
                           ${
                             isActive
                               ? "text-primary-600 dark:text-primary-400 cursor-default bg-white/20 dark:bg-white/10"
                               : "text-Neutral-400 hover:text-primary-600 dark:hover:text-primary-400 hover:bg-white/30 dark:hover:bg-Neutral-700/40 cursor-pointer"
                           }`}
              >
                <span className="text-lg">{getFlag(currentLang)}</span>

                <span className="font-medium">
                  {getNativeName(currentLang)}
                </span>

                {isActive && (
                  <div className="w-2 h-2 bg-primary-500 dark:bg-primary-400 rounded-full ml-auto shadow-[0_0_12px_rgba(99,102,241,0.4)]" />
                )}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
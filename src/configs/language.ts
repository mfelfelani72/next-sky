/**
 * @Author: Mohammad Felfelani
 * @Email: mfelfelani72@gmail.com
 * @Team:
 * @Date: 2025-10-04 07:17:02
 * @Description:
 */

export const languages = {
  en: {
    dir: "ltr",
    locale: "en_US",
    schemaLocale: "en-US",
    name: "English",
    flag: "🇺🇸",
    nativeName: "English",
  },
  fa: {
    dir: "rtl",
    locale: "fa_IR",
    schemaLocale: "fa-IR",
    name: "Persian",
    flag: "🇮🇷",
    nativeName: "فارسی",
  },
  ar: {
    dir: "rtl",
    locale: "ar_SA",
    schemaLocale: "ar-SA",
    name: "Arabic",
    flag: "🇸🇦",
    nativeName: "العربية",
  },
  ja: {
    dir: "ltr",
    locale: "ja_JP",
    schemaLocale: "ja-JP",
    name: "Japanese",
    flag: "🇯🇵",
    nativeName: "日本語",
  },
} as const;

export type Lang = keyof typeof languages;

export function getLocale(lang: Lang): string {
  return languages[lang].locale;
}

export function getSchemaLocale(lang: Lang): string {
  return languages[lang].schemaLocale;
}

export function getDirection(lang: Lang): "ltr" | "rtl" {
  return languages[lang].dir;
}

export function getName(lang: Lang): string {
  return languages[lang].name;
}

export function getNativeName(lang: Lang): string {
  return languages[lang].nativeName;
}

export function getFlag(lang: Lang): string {
  return languages[lang].flag;
}

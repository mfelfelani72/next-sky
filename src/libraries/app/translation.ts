/**
 * @Author: Mohammad Felfelani
 * @Email: mfelfelani72@gmail.com
 * @Team:
 * @Date: 2025-10-18 09:36:46
 * @Description: Translation utilities
 */

import React from "react";
import { getDictionary } from "@/locale";
import { type Lang } from "@/configs/app/language";

// Core translation function
export function createTranslator(lang: Lang) {
  const translations = getDictionary(lang);

  function t(key: string, fallback?: string) {
    if (!translations) {
      console.warn("Translations not loaded for language:", lang);
      return fallback ?? key;
    }

    const keys = key?.split(".");
    let value: unknown = translations;

    for (const k of keys) {
      if (value && typeof value === "object" && k in value) {
        value = (value as Record<string, unknown>)[k];
      } else {
        return fallback ?? key;
      }
    }

    return typeof value === "string" ? value : fallback ?? key;
  }

  return { t, lang };
}

// Simple SSR translation function
export function simpleTrans(
  i18nKey: string,
  values: Record<string, string> = {},
  t: (key: string) => string
): string {
  let text = t(i18nKey);

  for (const [key, value] of Object.entries(values)) {
    text = text.replace(new RegExp(`{{${key}}}`, "g"), value);
  }

  return text;
}

// Advanced trans function with React elements support
export function trans(
  i18nKey: string,
  values: Record<string, string>,
  t: (key: string) => string,
  ...elements: React.ReactElement[]
): React.ReactNode {
  let text = t(i18nKey);

  // Replace values
  for (const [key, value] of Object.entries(values)) {
    text = text.replace(new RegExp(`{{${key}}}`, "g"), value);
  }

  // Split and process
  const parts = text.split(/(<\d+>.*?<\/\d+>)/g);
  const result: React.ReactNode[] = [];

  parts.forEach((part, index) => {
    const tagMatch = part.match(/^<(\d+)>(.*?)<\/\d+>$/);

    if (tagMatch) {
      const elementIndex = Number(tagMatch[1]);
      const content = tagMatch[2];
      const element = elements[elementIndex];

      if (React.isValidElement(element)) {
        result.push(
          React.cloneElement(
            element,
            {
              key: index,
            },
            content
          )
        );
      } else {
        result.push(content);
      }
    } else if (part) {
      result.push(React.createElement(React.Fragment, { key: index }, part));
    }
  });

  return result;
}

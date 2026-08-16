/**
 * @Author: Mohammad Felfelani
 * @Email: mfelfelani72@gmail.com
 * @Date: 2025-10-04 14:27:32
 * @Description: Translation hook wrapper - re-export from forma-li
 */
"use client";

// Functions

import {
  setGetDictionary,
  useTranslation as useTranslationOriginal,
} from "forma-li";
import { getDictionary } from "@/locale";

setGetDictionary(getDictionary as any);

export const useTranslation = useTranslationOriginal;

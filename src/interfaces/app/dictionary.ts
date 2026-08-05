/**
 * @Author: Mohammad Felfelani
 * @Email: mfelfelani72@gmail.com
 * @Team:
 * @Date: 2025-10-12 09:03:23
 * @Description:
 */

// Interfaces

import { OpenGraphMeta, TwitterMeta } from "@/interfaces/app/meta";
import { Lang } from "@/configs/app/language";

export type Dictionary = Record<
  string,
  | string
  | {
      title: string;
      description: string;
      keywords?: string[];
      openGraph?: OpenGraphMeta;
      twitter?: TwitterMeta;
    }
>;

export interface LangState {
  lang: Lang;
  dir: "ltr" | "rtl";
  refreshKey: number;
  isInitialized: boolean;
  setLang: (newLang: Lang) => void;
  initializeLang: (langFromUrl?: string) => void;
  triggerRefresh?: () => void; 
}

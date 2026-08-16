// locale/index.ts
import { cache } from "react";
import { setupMetadata } from "forma-li";
import { setGetDictionary } from "forma-li";
import en from "./en";
import fa from "./fa";

const dictionaries = { en, fa };

export type Lang = keyof typeof dictionaries;

export const getDictionary = cache((lang: Lang = "en") => {
  return dictionaries[lang];
});

setupMetadata({}, getDictionary as any);
setGetDictionary(getDictionary as any);
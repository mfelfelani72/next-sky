/**
 * @Author: Mohammad Felfelani
 * @Email: mfelfelani72@gmail.com
 * @Team:
 * @Date: 2025-11-29 06:58:21
 * @Description:
 */
import { cache } from "react";
import en from "./en";
import fa from "./fa";
import ar from "./ar";
import ja from "./ja";

const dictionaries = { en, fa, ar, ja };

export type Lang = keyof typeof dictionaries;

export const getDictionary = cache((lang: Lang = "en") => {
  return dictionaries[lang];
});

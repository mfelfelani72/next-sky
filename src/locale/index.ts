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

const dictionaries = { en, fa };

export type Lang = keyof typeof dictionaries;

export const getDictionary = cache((lang: Lang = "en") => {
  return dictionaries[lang];
});

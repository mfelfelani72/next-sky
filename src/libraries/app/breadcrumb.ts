// Interfaces

import { languages } from "@/configs/app/language";

export function buildBreadcrumbs(pathname: string) {
  const segments = pathname.split("/").filter(Boolean);

  const LANGS = Object.keys(languages);

  // MongoDB ObjectId pattern (24 hex chars)
  const objectIdRegex = /^[a-f0-9]{24}$/i;

  const cleaned = segments.filter((seg, index) => {
    if (index === 0 && LANGS.includes(seg)) return false;
    if (objectIdRegex.test(seg)) return false;
    return true;
  });

  return cleaned.map((segment, index) => ({
    url: "/" + cleaned.slice(0, index + 1).join("/"),
    name: decodeURIComponent(segment).replace(/-/g, "_"),
  }));
}

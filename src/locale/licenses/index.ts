/*
 * @Author: Mohammad Felfelani
 * @Email: mfelfelani72@gmail.com
 * @Team:
 * @Date: 2025-10-12 08:09:32
 * @Description:
 */

import skyEn from "./sky/en.json";
import skyFa from "./sky/fa.json";


const allLicense = {
  aimoonhub: {
    en: skyEn,
    fa: skyFa,
  },
};

export function getLicenseTranslations(lang: string = "en") {
  const licenseName = process.env.NEXT_PUBLIC_LICENSE_NAME || "aimoonhub";

  const license = allLicense[licenseName as keyof typeof allLicense];

  return license?.[lang as keyof typeof license] || {};
}

export function getLicenses(lang: string) {
  return getLicenseTranslations(lang);
}

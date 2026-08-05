/*
 * @Author: Mohammad Felfelani
 * @Email: mfelfelani72@gmail.com
 * @Description: Multi language sitemap
 */

import { MetadataRoute } from "next";

const supportedLanguages = process.env.NEXT_PUBLIC_SUPPORTED_LANGUAGES || "en";

const locales = supportedLanguages.split(",").map((lang) => lang.trim());

const defaultLocale = locales[0] || "en";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://www.sky.ir";

  const allowIndex = process.env.NEXT_PUBLIC_ALLOW_INDEX === "true";

  const about = process.env.NEXT_PUBLIC_LICENSE_NAME || "sky";

  const pages = [
    {
      path: "home",
      changeFrequency: "hourly" as const,
      priority: 0.9,
    },
  ];

  if (!allowIndex) {
    return [];
  }

  return locales.flatMap((locale) =>
    pages.map((page) => {
      const currentUrl = `${baseUrl}/${locale}${page.path ? `/${page.path}/` : ""}`;

      return {
        url: currentUrl,
        lastModified: new Date(),
        changeFrequency: page.changeFrequency,
        priority: page.priority,
        alternates: {
          languages: {
            ...Object.fromEntries(
              locales.map((altLocale) => [
                altLocale,
                `${baseUrl}/${altLocale}${page.path ? `/${page.path}` : ""}`,
              ]),
            ),
            "x-default": `${baseUrl}/${defaultLocale}${page.path ? `/${page.path}` : ""}`,
          },
        },
      };
    }),
  );
}

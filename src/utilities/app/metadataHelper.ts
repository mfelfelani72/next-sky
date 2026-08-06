/**
 * @Author: Mohammad Felfelani
 * @Email: mfelfelani72@gmail.com
 * @Team:
 * @Date: 2025-10-08 15:28:13
 * @Description: Unified metadata generator for static and dynamic pages
 */

import type { Metadata } from "next";
import { cache } from "react";

// Configs

import type { Lang } from "@/configs/app/language";
import { getLocale, getSchemaLocale, languages } from "@/configs/app/language";
import { getDictionary } from "@/locale";

// Interfaces

import {
  BaseMeta,
  PageMeta,
  ContentData,
  ValidOgType,
} from "@/interfaces/app/meta";

// Functions

import { cns } from "@/libraries/app/api/cns";

// Constants

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost";
const basePort = process.env.NEXT_PUBLIC_BASE_PORT
  ? `${process.env.NEXT_PUBLIC_BASE_PORT}`
  : "";
const SITE_URL = `${baseUrl}${basePort}`;
const SITE_NAME = process.env.NEXT_PUBLIC_LICENSE_NAME || "sky";

const supportedLanguages = process.env.NEXT_PUBLIC_SUPPORTED_LANGUAGES || "en";
const locales = supportedLanguages
  .split(",")
  .map((lang) => lang.trim())
  .filter(Boolean);

// ---------- Helper Functions ----------

/**
 * Page Type Configuration
 */

const PAGE_TYPE_CONFIG = {
  news: { ogType: "article", schemaType: "NewsArticle" },
  article: { ogType: "article", schemaType: "Article" },
  blog: { ogType: "article", schemaType: "BlogPosting" },
  tag: { ogType: "website", schemaType: "CollectionPage" },
  category: { ogType: "website", schemaType: "CollectionPage" },
  author: { ogType: "profile", schemaType: "Person" },
  product: { ogType: "website", schemaType: "Product" },
  video: { ogType: "video.other", schemaType: "VideoObject" },
  podcast: { ogType: "music.podcast", schemaType: "PodcastEpisode" },
  profile: { ogType: "profile", schemaType: "ProfilePage" },
  about: { ogType: "website", schemaType: "AboutPage" },
  contact: { ogType: "website", schemaType: "ContactPage" },
  home: { ogType: "website", schemaType: "WebPage" },
  landing: { ogType: "website", schemaType: "LandingPage" },
  error: { ogType: "website", schemaType: "WebPage" },
} as const;

function getPageConfig(pageType?: string) {
  if (!pageType || !(pageType in PAGE_TYPE_CONFIG)) {
    return { ogType: "article" as const, schemaType: "Article" };
  }
  return PAGE_TYPE_CONFIG[pageType as keyof typeof PAGE_TYPE_CONFIG];
}

/**
 * Generate canonical URL for a given language and path
 */
export function generateCanonicalUrl(lang: Lang, path: string = ""): string {
  const cleanPath = path.startsWith("/") ? path.slice(1) : path;
  return `${SITE_URL}/${lang}${cleanPath ? `/${cleanPath}` : ""}`;
}

/**
 * Generate alternate language links for a given path
 */
export function generateAlternateLanguages(
  path?: string,
): Record<string, string> {
  const languagesObj: Record<string, string> = {};

  locales.forEach((locale) => {
    languagesObj[locale] = generateCanonicalUrl(locale as Lang, path || "");
  });

  const defaultLocale = locales[0] || "en";
  languagesObj["x-default"] = generateCanonicalUrl(
    defaultLocale as Lang,
    path || "",
  );

  return languagesObj;
}

function generatePageTitle(pageTitle: string, baseTitle: string): string {
  return pageTitle === baseTitle ? baseTitle : `${pageTitle} | ${baseTitle}`;
}

function combineKeywords(
  baseKeywords: string[] = [],
  pageKeywords: string[] = [],
): string[] {
  return [...new Set([...baseKeywords, ...pageKeywords])];
}

// ---------- Static Metadata Generator ----------

/**
 * Convert raw content data to Next.js Metadata object
 * This is the bridge between your data layer and Next.js metadata
 */

function buildMetadataFromContent(
  data: ContentData,
  lang: Lang,
  address?: string,
): Metadata {
  const canonicalUrl = generateCanonicalUrl(lang, address || "");

  const imageUrl = data.image.startsWith("http")
    ? data.image
    : `${SITE_URL}${data.image.startsWith("/") ? data.image : "/" + data.image}`;

  const pageConfig = getPageConfig(data.pageType);
  const ogType = pageConfig.ogType as ValidOgType;

  const metadata: Metadata = {
    applicationName: SITE_NAME,
    authors: data.author ? [{ name: data.author }] : [{ name: SITE_NAME }],
    creator: data.author || SITE_NAME,
    title: data.title,
    description: data.description,
    publisher: data.provider,
    openGraph: {
      title: data.title,
      description: data.description,
      url: canonicalUrl,
      siteName: SITE_NAME,
      type: ogType,
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: data.title,
        },
      ],
      locale: getLocale(lang),
      publishedTime: data.datePublished,
      modifiedTime: data.dateModified,
      ...(data.author && { authors: [data.author] }),
    },

    twitter: {
      card: "summary_large_image",
      title: data.title,
      description: data.description,
      images: [imageUrl],

      ...(data.author && { creator: data.author }),
      ...(data.twitterSite && { site: data.twitterSite }),
      ...(!data.twitterSite && { site: process.env.NEXT_PUBLIC_TWITTER_SITE }),
    },

    robots: {
      ...(data.robots || { index: true, follow: true }),
      ...(data.robots?.archive === false ? { archive: false } : {}),
    },

    alternates: {
      canonical: canonicalUrl,
      languages: generateAlternateLanguages(address),
    },

    icons: {
      icon: `/${process.env.NEXT_PUBLIC_LICENSE_NAME || "sky"}/favicon.ico`,
      shortcut: `/${process.env.NEXT_PUBLIC_LICENSE_NAME || "sky"}/favicon.ico`,
      apple: `/${process.env.NEXT_PUBLIC_LICENSE_NAME || "sky"}/favicon.ico`,
    },

    ...(data.newsKeywords &&
      data.newsKeywords.length > 0 && {
        keywords: data.newsKeywords.join(", "),
      }),
  };

  if (data.originalSourceUrl) {
    console.debug(`[Meta] Original source detected: ${data.originalSourceUrl}`);
  }

  return metadata;
}

/**
 * Generate metadata for static pages using dictionary
 */
export async function generatePageMetadata(
  lang: Lang = "en",
  pageKey?: string,
  customMeta?: Partial<PageMeta>,
): Promise<Metadata> {
  // Constants

  const dict = await getDictionary(lang);

  const baseMeta = dict.meta as BaseMeta;

  const pageMetaCandidate = pageKey
    ? dict[`meta_${pageKey}` as keyof typeof dict]
    : null;

  const pageMeta = (pageMetaCandidate as PageMeta) || baseMeta;

  const finalMeta: PageMeta = customMeta
    ? { ...pageMeta, ...customMeta }
    : pageMeta;

  const pageTitle = generatePageTitle(finalMeta.title, baseMeta.title);

  const canonicalUrl =
    finalMeta.canonicalUrl || generateCanonicalUrl(lang, pageKey);

  return {
    title: pageTitle,
    description: finalMeta.description,
    keywords: combineKeywords(baseMeta.keywords, finalMeta.keywords).join(", "),
    publisher: finalMeta.publisher || baseMeta.publisher,
    applicationName: SITE_NAME,
    authors: [{ name: SITE_NAME }],
    creator: SITE_NAME,
    openGraph: {
      title: pageTitle,
      description: finalMeta.description,
      url: canonicalUrl,
      siteName: baseMeta.title,
      type: "website",
      images: [
        {
          url: SITE_URL + baseMeta.openGraph?.images,
          width: 1200,
          height: 630,
          alt: pageTitle,
        },
      ],
      locale: getLocale(lang),
    },

    twitter: {
      card: "summary_large_image",
      title: pageTitle,
      description: finalMeta.description,
      images: [SITE_URL + baseMeta.openGraph?.images],
      ...{ site: process.env.NEXT_PUBLIC_TWITTER_SITE },
    },

    robots: finalMeta.robots || { index: true, follow: true },

    alternates: {
      canonical: generateCanonicalUrl(lang, pageKey),
      languages: generateAlternateLanguages(pageKey),
    },

    icons: {
      icon: `/${process.env.NEXT_PUBLIC_LICENSE_NAME || "sky"}/favicon.ico`,
      apple: `/${process.env.NEXT_PUBLIC_LICENSE_NAME || "sky"}/favicon.ico`,
    },
  };
}

// ---------- Schema Generators ----------

export function generateWebsiteSchema(lang: Lang) {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_NAME,
    url: SITE_URL,
    inLanguage: getSchemaLocale(lang),
    potentialAction: {
      "@type": "SearchAction",
      target: `${SITE_URL}/search?q={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  };
}

export function generateOrganizationSchema(lang: Lang) {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE_NAME,
    url: SITE_URL,
    logo: `${SITE_URL}/images/logo/logo.png`,
    inLanguage: getSchemaLocale(lang),
    sameAs: ["https://twitter.com/sky", "https://linkedin.com/company/sky"],
  };
}

export function generateArticleSchema(
  lang: Lang,
  article: {
    title: string;
    description: string;
    image: string;
    datePublished: string;
    dateModified: string;
    authorName: string;
    authorUrl?: string;
    originalSourceUrl?: string;
  },
) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.description,
    image: article.image,
    datePublished: article.datePublished,
    dateModified: article.dateModified,
    author: {
      "@type": "Person",
      name: article.authorName,
      ...(article.authorUrl && { url: article.authorUrl }),
    },
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
      logo: {
        "@type": "ImageObject",
        url: `${SITE_URL}/images/logo/logo.png`,
      },
    },
    inLanguage: getSchemaLocale(lang),
    ...(article.originalSourceUrl && {
      citation: {
        "@type": "CreativeWork",
        url: article.originalSourceUrl,
      },
      isBasedOn: {
        "@type": "CreativeWork",
        url: article.originalSourceUrl,
      },
    }),
  };
}

export function generateBreadcrumbSchema(
  items: { name: string; url: string }[],
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${SITE_URL}${item.url}`,
    })),
  };
}

// ---------- Dynamic Metadata Helpers ----------

/**
 * Fetch meta JSON for dynamic pages from server API
 */
async function fetchMetaJsonFromServer(
  slug: string | Record<string, any>,
  source: string,
  lang: Lang,
) {
  const resolvedSlug = typeof slug === "string" ? slug : slug.symbol;

  const host =
    process.env.NODE_ENV === "production"
      ? process.env.NEXT_PUBLIC_FRONT_URL
      : `${process.env.NEXT_PUBLIC_BASE_URL}${process.env.NEXT_PUBLIC_BASE_PORT}`;

  try {
    const res = await cns<any>({
      method: "post",
      endPoint: `${host}/api/meta/`,
      route: "/metadescription",
      body: {
        action: "fetchMeta",
        slug: resolvedSlug,
        source,
        lang,
      },
    });

    if (!res?.success) {
      throw new Error(`Failed to fetch meta`);
    }

    return res.data;
  } catch (err) {
    console.error("[Meta] Fetch failed for slug:", resolvedSlug, err);
    return null;
  }
}

type Params = {
  lang?: string;
  slug?: string | Record<string, any> | string[];
};

/**
 * Generate metadata dynamically based on language and source key
 * Works for both static (no slug) and dynamic (with slug) pages
 */
export async function createMetadata(
  params: Params,
  source: string,
  slugIndicator: number = -1,
  location?: string,
  externalData?: ContentData | null,
) {
  // Constants

  const resolvedParams = await Promise.resolve(params);

  const lang = resolvedParams.lang ?? "en";
  const selected: Lang = lang in languages ? (lang as Lang) : "en";

  let slug = resolvedParams.slug;
  let address: string | undefined;

  if (Array.isArray(resolvedParams.slug) && location) {
    address =
      location + "/" + resolvedParams.slug[0] + "/" + resolvedParams.slug[1];
  } else if (typeof resolvedParams.slug === "string" && location) {
    address = location + "/" + resolvedParams.slug;
  }

  if (Array.isArray(slug) && slugIndicator !== -1) {
    slug = slug[slugIndicator];
  }

  if (!slug) {
    return generatePageMetadata(selected, source);
  }

  if (externalData) {
    try {
      console.debug(`[Meta] Using external data for ${source}/${slug}`);
      return buildMetadataFromContent(externalData, selected, address);
    } catch (error) {
      console.error(
        `[Meta] Error building metadata from external data:`,
        error,
      );
    }
  }

  try {
    const metaJson = await fetchMetaJsonFromServer(slug, source, selected);

    if (!metaJson) {
      console.warn(`[Meta] Fallback to static for ${source} / ${slug}`);
      return generatePageMetadata(selected, source);
    }

    const canonicalUrl = generateCanonicalUrl(selected, address || "");

    return {
      ...metaJson,
      alternates: {
        canonical: canonicalUrl,
        languages: generateAlternateLanguages(address),
      },
      icons: {
        icon: `/${process.env.NEXT_PUBLIC_LICENSE_NAME || "sky"}/favicon.ico`,
        shortcut: `/${process.env.NEXT_PUBLIC_LICENSE_NAME || "sky"}/favicon.ico`,
        apple: `/${process.env.NEXT_PUBLIC_LICENSE_NAME || "sky"}/favicon.ico`,
      },
    };
  } catch (error) {
    console.error(
      `[Meta] Critical error in createMetadata for ${source}:`,
      error,
    );
    return generatePageMetadata(selected, source);
  }
}
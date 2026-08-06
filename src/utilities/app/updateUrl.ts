/*
 * @Author: Mohammad Felfelani
 * @Email: mfelfelani72@gmail.com
 * @Team:
 * @Date: 2025-10-18 08:37:33
 * @Description:
 */

import { redirect } from "next/navigation";

// Functions

const safeDecodeURIComponent = (
  str: string | undefined,
): string | undefined => {
  if (typeof str !== "string") return undefined;
  try {
    return decodeURIComponent(str);
  } catch (e) {
    console.error("Error decoding component:", str, e);
    return str;
  }
};

// Interfaces

interface UrlBlogData {
  lang: string;
  location: string;
  id?: string | number;
  correctSlugs: (string | undefined)[];
  urlSlugs: (string | undefined)[];
}

interface UrlTagData {
  lang: string;
  location: string;
  id?: string;
  correctSlug?: string;
  urlSlug?: string;
}

interface PropsBlog {
  data: UrlBlogData;
}
interface PropsTag {
  data: UrlTagData;
}

// Main function
export const updateUrlBlog = ({ data }: PropsBlog) => {
  // Decode all incoming URL slugs

  const incomingSlugsDecoded = data.urlSlugs.map(safeDecodeURIComponent);

  // Case: Missing ID → redirect to base

  if (!data.id) {
    console.error(`Error fetching article details for ID: ${data.id}`);
    redirect(`/${data.lang}/${data.location}`);
  }

  const correctSlugs = data.correctSlugs;

  // Compare arrays: if one element differs → redirect
  const slugsAreDifferent =
    incomingSlugsDecoded.length !== correctSlugs.length ||
    incomingSlugsDecoded.some((slug, idx) => slug !== correctSlugs[idx]);

  if (slugsAreDifferent) {
    const slugPath = correctSlugs.join("/");
    const newPath = `/${data.lang}/${data.location}/${data.id}/${slugPath}`;
    redirect(newPath);
  }

  return "";
};
export const updateUrlTag = ({ data }: PropsTag) => {
  const incomingSlugDecoded = safeDecodeURIComponent(data.urlSlug);
  let correctSlugCleaned = data.correctSlug?.replace(/^#/, "");

  if (!data.id) {
    redirect(`/${data.lang}/news/`);
  }

  if (incomingSlugDecoded !== correctSlugCleaned && correctSlugCleaned) {
    const slugForUrl = encodeURIComponent(correctSlugCleaned);
    const newPath = `/${data.lang}/news/${data.location}/${data.id}/${slugForUrl}`;
    redirect(newPath);
  }

  return "";
};

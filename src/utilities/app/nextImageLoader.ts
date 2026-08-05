/**
 * @Author: Mohammad Felfelani
 * @Email: mfelfelani72@gmail.com
 * @Team:
 * @Date: 2025-11-02 06:07:10
 * @Description:
 */
import { ImageLoaderProps } from "next/image";

export const nextImageLoader = ({ src, width, quality }: ImageLoaderProps) => {
  let processedSrc = src;

  if (processedSrc.startsWith("http://")) {
    processedSrc = processedSrc.replace("http://", "https://");
  }

  const isExternal = processedSrc.startsWith("https://");

  const basePath =
    process.env.NODE_ENV === "production"
      ? process.env.NEXT_PUBLIC_BASE_PATH || ""
      : "";

  const finalSrc = isExternal ? processedSrc : `${basePath}${processedSrc}`;

  return `${finalSrc}?w=${width}&q=${quality || 75}`;
};

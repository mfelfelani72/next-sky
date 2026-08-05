/*
 * @Author: Mohammad mfelfelani72@gmail.com
 * @Date: 2026-02-24 08:03:11
 * @LastEditTime: 2026-06-23 07:22:30
 * @Description:
 */

import { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  const capitalLicenseName =
    (process.env.NEXT_PUBLIC_LICENSE_NAME || "sky")
      .charAt(0)
      .toUpperCase() +
    (process.env.NEXT_PUBLIC_LICENSE_NAME || "sky").slice(1);
  const licenseName = process.env.NEXT_PUBLIC_LICENSE_NAME || "sky";
  const licenseDescription =
    process.env.LICENSE_DESCRIPTION || "sky is a Crypto News Application";
  const backgroundColor = process.env.PWA_BACKGROUND_COLOR || "#cc6e3c";
  const themeColor = process.env.PWA_THEME_COLOR || "#cc6e3c";

  return {
    name: capitalLicenseName,
    short_name: capitalLicenseName,
    description: licenseDescription,
    start_url: "/",
    scope: "/",
    display: "standalone",
    background_color: backgroundColor,
    theme_color: themeColor,
    icons: [
      {
        src: `/${licenseName}/icons/logo-72.png`,
        sizes: "72x72",
        type: "image/png",
      },
      {
        src: `/${licenseName}/icons/logo-96.png`,
        sizes: "96x96",
        type: "image/png",
      },
      {
        src: `/${licenseName}/icons/logo-128.png`,
        sizes: "128x128",
        type: "image/png",
      },
      {
        src: `/${licenseName}/icons/logo-144.png`,
        sizes: "144x144",
        type: "image/png",
      },
      {
        src: `/${licenseName}/icons/logo-152.png`,
        sizes: "152x152",
        type: "image/png",
      },
      {
        src: `/${licenseName}/icons/logo-192.png`,
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: `/${licenseName}/icons/logo-384.png`,
        sizes: "384x384",
        type: "image/png",
      },
      {
        src: `/${licenseName}/icons/logo-512.png`,
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}

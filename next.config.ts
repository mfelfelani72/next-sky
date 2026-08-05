/**
 * @Author: Mohammad Felfelani
 * @Email: mfelfelani72@gmail.com
 * @Team:
 * @Date: 2026-01-12 09:37:30
 * @Description: Next.js configuration with PWA
 */

import type { NextConfig } from "next";

const isProd = process.env.NODE_ENV === "production";

const withPWA = require("next-pwa")({
  dest: "public",
  disable: false,
  register: true,
  skipWaiting: true,
  buildExcludes: [/middleware-manifest\.json$/],
  runtimeCaching: [
    {
      urlPattern: /\.(js|css|png|jpg|jpeg|svg|ico)$/,
      handler: "CacheFirst",
      options: {
        cacheName: "static-cache",
        expiration: {
          maxEntries: 50,
          maxAgeSeconds: 24 * 60 * 60, // 1 day
        },
      },
    },
  ],
});

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/:lang/x/y/:slug",
        destination: "/:lang/x/y/:slug/z/",
        permanent: true,
      },
    ];
  },

  async rewrites() {
    const licenseName = process.env.NEXT_PUBLIC_LICENSE_NAME || "sky"

    const afterFiles = [];

    afterFiles.push(
      {
        source: "/images/:path*",
        destination: `/${licenseName}/images/:path*`,
      },
      {
        source: "/videos/:path*",
        destination: `/${licenseName}/videos/:path*`,
      },
    );

    if (process.env.NODE_ENV === "production") {
      afterFiles.push({
        source: "/:lang/playground/:path*",
        destination: "/404",
      });
    }

    return {
      afterFiles,
    };
  },

  reactStrictMode: true,

  experimental: {
    optimizeCss: true,
  },

  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
      },
      {
        protocol: "https",
        hostname: "news.imoonex.ir",
      },
    ],
  },

  compiler: {
    removeConsole: process.env.NODE_ENV === "production",
    // removeConsole: false,
  },

  ...(isProd ? { output: "standalone" } : {}),

  basePath: isProd ? process.env.NEXT_PUBLIC_BASE_PATH || "" : "",
  assetPrefix: isProd ? process.env.NEXT_PUBLIC_BASE_PATH || "" : "",

  trailingSlash: true,
};

export default withPWA(nextConfig);

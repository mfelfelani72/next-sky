/*
 * @Author: Mohammad Felfelani
 * @Email: mfelfelani72@gmail.com
 * @Team:
 * @Date: 2025-10-12 08:09:32
 * @Description:
 */

import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {

  // Constants

  const baseUrl =
    process.env.NEXT_PUBLIC_BASE_URL ||
    'https://www.sky.ir';

  const allowIndex = process.env.NEXT_PUBLIC_ALLOW_INDEX === 'true';

  const licenseName = process.env.NEXT_PUBLIC_LICENSE_NAME || "sky";

  const locales = (process.env.NEXT_PUBLIC_SUPPORTED_LANGUAGES || 'en')
    .split(',')
    .map(lang => lang.trim());

  const publicPaths = locales.flatMap(locale => [
    `/${locale}/news/`,
    `/${locale}/tag/`,
    `/${locale}/dashboard/latest-news/`,
    `/${locale}/${licenseName}/`,
    `/google-site-verification/`,
    `/sitemap/`,
  ]);


  const restrictedPaths = [
    '/api/',
    '/_next/',
    ...locales.flatMap(locale => [
      `/${locale}/auth/login/`,
      `/${locale}/auth/register/`,
    ]),
    '/.env',
    '/.git',
    '/.github',
    '/.vscode',
    '/.idea',
    '/node_modules/',
    '/dist/',
    '/build/',
    '/coverage/',
    '/.next/',
    '/out/',
    '/public/static/',
  ];

  if (!allowIndex) {
    return {
      rules: [
        {
          userAgent: '*',
          disallow: '/',
        },
        {
          userAgent: 'Googlebot',
          disallow: '/',
        },
        {
          userAgent: 'Bingbot',
          disallow: '/',
        },
        {
          userAgent: 'Slurp',
          disallow: '/',
        },
        {
          userAgent: 'DuckDuckBot',
          disallow: '/',
        },
        {
          userAgent: 'Baiduspider',
          disallow: '/',
        },
        {
          userAgent: 'YandexBot',
          disallow: '/',
        },
        {
          userAgent: 'Sogou',
          disallow: '/',
        },
        {
          userAgent: 'Exabot',
          disallow: '/',
        },
        {
          userAgent: 'facebookexternalhit',
          disallow: '/',
        },
        {
          userAgent: 'Twitterbot',
          disallow: '/',
        },
        {
          userAgent: 'rogerbot',
          disallow: '/',
        },
        {
          userAgent: 'linkedinbot',
          disallow: '/',
        },
        {
          userAgent: 'embedly',
          disallow: '/',
        },
        {
          userAgent: 'quora link preview',
          disallow: '/',
        },
        {
          userAgent: 'showyoubot',
          disallow: '/',
        },
        {
          userAgent: 'outbrain',
          disallow: '/',
        },
        {
          userAgent: 'pinterest',
          disallow: '/',
        },
        {
          userAgent: 'slackbot',
          disallow: '/',
        },
        {
          userAgent: 'telegrambot',
          disallow: '/',
        },
        {
          userAgent: 'whatsapp',
          disallow: '/',
        },
      ],
    };
  }

  return {
    rules: [
      {
        userAgent: '*',
        allow: publicPaths,
        disallow: restrictedPaths,
        crawlDelay: 10,
      },
      {
        userAgent: 'Googlebot',
        allow: publicPaths,
        disallow: restrictedPaths,
        crawlDelay: 5,
      },
      {
        userAgent: 'Bingbot',
        allow: publicPaths,
        disallow: restrictedPaths,
        crawlDelay: 10,
      },
      {
        userAgent: 'Slurp',
        allow: publicPaths,
        disallow: restrictedPaths,
        crawlDelay: 15,
      },
      {
        userAgent: 'DuckDuckBot',
        allow: publicPaths,
        disallow: restrictedPaths,
        crawlDelay: 10,
      },
      {
        userAgent: 'Baiduspider',
        allow: publicPaths,
        disallow: restrictedPaths,
        crawlDelay: 20,
      },
      {
        userAgent: 'YandexBot',
        allow: publicPaths,
        disallow: restrictedPaths,
        crawlDelay: 10,
      },
      {
        userAgent: 'Sogou',
        allow: publicPaths,
        disallow: restrictedPaths,
        crawlDelay: 15,
      },
      {
        userAgent: 'Exabot',
        allow: publicPaths,
        disallow: restrictedPaths,
        crawlDelay: 10,
      },
      {
        userAgent: 'facebookexternalhit',
        allow: publicPaths,
        disallow: restrictedPaths,
      },
      {
        userAgent: 'Twitterbot',
        allow: publicPaths,
        disallow: restrictedPaths,
      },
      {
        userAgent: 'linkedinbot',
        allow: publicPaths,
        disallow: restrictedPaths,
      },
      {
        userAgent: 'rogerbot',
        allow: publicPaths,
        disallow: restrictedPaths,
      },
      {
        userAgent: 'embedly',
        allow: publicPaths,
        disallow: restrictedPaths,
      },
      {
        userAgent: 'quora link preview',
        allow: publicPaths,
        disallow: restrictedPaths,
      },
      {
        userAgent: 'showyoubot',
        allow: publicPaths,
        disallow: restrictedPaths,
      },
      {
        userAgent: 'outbrain',
        allow: publicPaths,
        disallow: restrictedPaths,
      },
      {
        userAgent: 'pinterest',
        allow: publicPaths,
        disallow: restrictedPaths,
      },
      {
        userAgent: 'slackbot',
        allow: publicPaths,
        disallow: restrictedPaths,
      },
      {
        userAgent: 'telegrambot',
        allow: publicPaths,
        disallow: restrictedPaths,
      },
      {
        userAgent: 'whatsapp',
        allow: publicPaths,
        disallow: restrictedPaths,
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
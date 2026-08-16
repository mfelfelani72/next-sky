/*
 * @Author: Mohammad mfelfelani72@gmail.com
 * @Date: 2026-02-03 06:45:58
 * @LastEditors: Mohammad mfelfelani72@gmail.com
 * @LastEditTime: 2026-05-10 16:55:59
 * @FilePath: /next-aimoonhub-dev/src/components/base/BreadcrumbSchema.tsx
 * @Description:
 */
import { headers } from "next/headers";

// Functions

import { buildBreadcrumbs } from "@/libraries/app/breadcrumb";
import { createTranslator } from "forma-li"

// Interfaces

import { Lang } from "@/configs/app/language";

export const dynamic = "force-dynamic";

export default async function BreadcrumbSchema({ lang }: { lang: Lang }) {
  // Functions and Consts

  const headersList = await headers();

  const { t } = createTranslator(lang);

  const pathname =
    headersList.get("x-pathname") ?? headersList.get("x-invoke-path") ?? "/";

  const crumbs = buildBreadcrumbs(pathname);
  if (!crumbs.length) return null;

  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: crumbs.map((crumb, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: t(crumb.name),
      item: `${[process.env.NEXT_PUBLIC_BASE_URL]}${crumb.url}`,
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(schema),
      }}
    />
  );
}

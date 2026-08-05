/*
 * @Author: Mohammad Felfelani
 * @Email: mfelfelani72@gmail.com
 * @Team:
 * @Date: 2026-01-04 07:40:10
 * @Description:
 */
"use client";

import { usePathname } from "next/navigation";
import { Fragment } from "react";
import { useTranslation } from "@/hooks/app/useTranslation";

// Components

import LocalizedLink from "@/components/base/LocalizedLink";
import { ChevronRight, Home } from "lucide-react";
import TooltipWrapper from "@/components/ui/core/TooltipWrapper";

const DotBreadcrumb = ({ crumbs }: any) => {
  // Hooks

  const { t } = useTranslation();

  // Constants

  const dir = useLangStore((state) => state.dir);

  return (
    <ol
      dir={dir}
      className="flex flex-wrap gap-2 bg-Neutral-50 rounded-lg p-4 max-w-[20rem] max-h-44 overflow-hidden overflow-y-auto scrollbar"
    >
      {crumbs.map((crumb: any, index: number) => {
        const isLast = index === crumbs.length - 1;

        return (
          <li key={crumb.url} className="flex items-center gap-2">
            <LocalizedLink
              
              href={crumb.url}
              className="text-Neutral-300 hover:text-primary-400 transition-colors truncate"
            >
              {t(crumb.name)}
            </LocalizedLink>

            {!isLast && (
              <ChevronRight
                size={16}
                className="text-Neutral-200 rtl:rotate-y-180"
                aria-hidden="true"
              />
            )}
          </li>
        );
      })}
    </ol>
  );
};

// Functions

import { buildBreadcrumbs } from "@/libs/breadcrumb";

// Zustand

import { useLangStore } from "@/stores/LangStore";

export default function Breadcrumb() {
  // Hooks

  const pathname = usePathname() || "/";
  const { t } = useTranslation();

  // Constants

  const dir = useLangStore((state) => state.dir);

  // Functions

  const crumbs = buildBreadcrumbs(pathname);

  if (crumbs.length === 0) return null;

  return (
    <nav aria-label="breadcrumb" className="flex h-full items-center">
      <div className="container px-4">
        <ol className="flex h-full items-center space-x-2">
          <li className="h-full flex items-center">
            <LocalizedLink
              
              href={`${process.env.NEXT_PUBLIC_BASE_ROUTE}`}
              className="inline-flex h-full items-center text-Neutral-300 hover:text-primary-400 transition-colors"
              aria-label="Home"
            >
              <Home size={18} />
            </LocalizedLink>
          </li>
          <li className="flex items-center">
            <ChevronRight
              size={16}
              className="text-Neutral-200 rtl:rotate-y-180"
              aria-hidden="true"
            />
          </li>

          {crumbs.map((crumb, index) => {
            const isFirst = index === 0;
            const isLast = index === crumbs.length - 1;
            const hasMiddle = crumbs.length > 2;

            if (isFirst) {
              return (
                <Fragment key={crumb.url}>
                  <li>
                    <LocalizedLink
                      
                      href={crumb.url}
                      className="text-Neutral-300 hover:text-primary-400 transition-colors whitespace-nowrap"
                    >
                      {t(crumb.name)}
                    </LocalizedLink>
                  </li>
                </Fragment>
              );
            }

            if (index === 1 && hasMiddle) {
              return (
                <Fragment key="dots">
                  <li className="flex items-center">
                    <ChevronRight
                      size={16}
                      className="text-Neutral-200 rtl:rotate-y-180"
                      aria-hidden="true"
                    />
                  </li>
                  <li className="text-Neutral-200 select-none">
                    <TooltipWrapper
                      expandable
                      expandDirection={
                        dir == "ltr" ? "bottom-right" : "bottom-right"
                      }
                      expandedContent={
                        <DotBreadcrumb crumbs={crumbs.slice(1, -1)} />
                      }
                    >
                      <div className="text-Neutral-200 cursor-pointer select-none">
                        ...
                      </div>
                    </TooltipWrapper>
                  </li>
                </Fragment>
              );
            }

            if (isLast) {
              return (
                <Fragment key={crumb.url}>
                  <li className="flex items-center">
                    <ChevronRight
                      size={16}
                      className="text-Neutral-200 rtl:rotate-y-180"
                      aria-hidden="true"
                    />
                  </li>
                  <li>
                    <span
                      className="text-Neutral-500 dark:text-Neutral-200 font-medium truncate inline-block pt-3 overflow-hidden w-[20ch] md:w-[25ch] whitespace-nowrap"
                      aria-current="page"
                    >
                      {t(crumb.name)}
                    </span>
                  </li>
                </Fragment>
              );
            }

            return null;
          })}
        </ol>
      </div>
    </nav>
  );
}

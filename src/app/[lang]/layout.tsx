/*
 * @Author: Mohammad Felfelani
 * @Email: mfelfelani72@gmail.com
 * @Team:
 * @Date: 2025-10-04 11:48:20
 * @Description:
 */

import type { Metadata } from "next";

// Containers

// import UserCheck from "@/containers/user/UserCheck";

// Components

import LayoutWrapper from "@/app/[lang]/LayoutWrapper";
import DetectDevice from "@/app/[lang]/DetectDevice";
// import Tools from "@/app/[lang]/Tools";
import BreadcrumbSchema from "@/components/base/BreadcrumbSchema";

// Functions

import { getDictionary } from "@/locale";

// Interfaces

import { LangLayoutProps } from "@/interfaces/app/global";
import { languages, type Lang } from "@/configs/app/language";

// Functions

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const resolvedParams = await params;
  const lang =
    resolvedParams.lang in languages ? (resolvedParams.lang as Lang) : "en";
  const dictionary = await getDictionary(lang);

  return {
    title: dictionary.meta.title,
    description: dictionary.meta.description,
    keywords: dictionary.meta.keywords || [],
  };
}

export default async function LangLayout({
  children,
  params,
}: LangLayoutProps) {
  const resolvedParams = await params;
  const lang =
    resolvedParams.lang in languages ? (resolvedParams.lang as Lang) : "en";

  const dictionary = await getDictionary(lang);

  return (
    <>
      <LayoutWrapper langFromUrl={lang} dictionary={dictionary}>
        {/* <UserCheck /> */}
        <BreadcrumbSchema lang={lang} />
        {/* <Tools /> */}
        <DetectDevice />
        {children}
      </LayoutWrapper>
    </>
  );
}

/*
 * @Author: Mohammad Felfelani
 * @Email: mfelfelani72@gmail.com
 * @Team:
 * @Date: 2025-12-13 14:26:00
 * @Description:
 */
import { createMetadata } from "forma-li";

import { createTranslator } from "forma-li";

// Interfaces

import { Lang, languages } from "@/configs/app/language";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  return createMetadata(await params, "home");
}

async function page({ params }: { params: Promise<{ lang: string }> }) {
  const resolvedParams = await params;
  const lang =
    resolvedParams.lang in languages ? (resolvedParams.lang as Lang) : "en";

  const { t } = createTranslator(lang as Lang);

  return (
    <>
      <div className="flex flex-col h-full min-h-0 bg-white dark:bg-background">
        <div className="min-h-screen px-2">{t("home")}</div>
      </div>
    </>
  );
}

export default page;

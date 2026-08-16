import React from "react";

// Components

import { Login } from "next-auth-mfelfelani72";

// Functions

import { createMetadata } from "forma-li";

// Configures

import { languages, type Lang } from "@/configs/app/language";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  return createMetadata(await params, "login");
}

export default async function Page({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const resolvedParams = await params;
  const lang =
    resolvedParams.lang in languages ? (resolvedParams.lang as Lang) : "en";

  return (
    <Login
      layout="twoColumn"
      theme="default"
      className="w-full max-w-none px-0"
    />
  );
}

import React from "react";

// Components

import { Login } from "next-auth-mfelfelani72";

// Functions

import { createMetadata } from "forma-li";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  return createMetadata(await params, "login");
}

export default async function Page() {
  return (
    <>
     
      <Login
        layout="twoColumn"
        theme="default"
        className="w-full max-w-none px-0"
      />
    </>
  );
}

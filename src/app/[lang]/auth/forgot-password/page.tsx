/*
 * @Author: Mohammad Felfelani
 * @Email: mfelfelani72@gmail.com
 * @Team:
 * @Date: 2025-12-29 05:41:18
 * @Description:
 */

// Components

import ForgotPassword from "@/components/ui/auth/common/forgotPassword/ForgotPasswordLanding";
// Functions

import { createMetadata } from "@/utilities/app/metadataHelper";

// Interfaces

import { languages, type Lang } from "@/configs/app/language";

// Create Metadata
export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  return createMetadata(await params, "forgotPassword");
}

async function Page({ params }: { params: Promise<{ lang: string }> }) {
  const resolvedParams = await params;

  const lang =
    resolvedParams.lang in languages ? (resolvedParams.lang as Lang) : "en";

  return (
    <div className="bg-cover bg-center bg-fixed"
      style={{
        backgroundImage: `url('/images/jpg/auth.jpeg')`,
      }}
    >
      <ForgotPassword params={{ lang }} />
    </div>
  );
}

export default Page;

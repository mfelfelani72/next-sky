/*
 * @Author: Mohammad Felfelani
 * @Email: mfelfelani72@gmail.com
 * @Team:
 * @Date: 2025-12-29 05:41:18
 * @Description:
 */

// Components

import Register from "@/components/ui/auth/common/register/RegisterLanding";
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
  return createMetadata(await params, "register");
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
      <Register params={{ lang }} />
    </div>
  );
}

export default Page;

/*
 * @Author: Mohammad Felfelani
 * @Email: mfelfelani72@gmail.com
 * @Team:
 * @Date: 2025-12-29 06:04:17
 * @Description:
 */

import dynamic from "next/dynamic";

// Components

const LoginDesktop = dynamic(
  () => import("@/components/ui/auth/desktop/Login")
);
const LoginMobile = dynamic(() => import("@/components/ui/auth/mobile/Login"));

const LoginIpad = dynamic(() => import("@/components/ui/auth/ipad/Login"));

// Functions

import detectComponentsResponsive from "@/libraries/app/detectComponentResponsive";

// Interfaces

import { type Lang } from "@/configs/app/language";

const LoginLanding = async ({ params }: { params: { lang: Lang } }) => {
  const LoginComponent = await detectComponentsResponsive(
    LoginMobile,
    LoginIpad,
    LoginDesktop
  );

  return <LoginComponent params={params} />;
};

export default LoginLanding;

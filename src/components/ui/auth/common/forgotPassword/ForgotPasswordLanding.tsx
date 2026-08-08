/*
 * @Author: Mohammad Felfelani
 * @Email: mfelfelani72@gmail.com
 * @Team:
 * @Date: 2025-12-29 06:04:17
 * @Description:
 */

import dynamic from "next/dynamic";

// Components

const ForgotPasswordDesktop = dynamic(
  () => import("@/components/ui/auth/desktop/ForgotPassword")
);
const ForgotPasswordMobile = dynamic(() => import("@/components/ui/auth/mobile/ForgotPassword"));

const ForgotPasswordIpad = dynamic(() => import("@/components/ui/auth/ipad/ForgotPassword"));

// Functions

import detectComponentsResponsive from "@/libraries/app/detectComponentResponsive";

// Interfaces

import { type Lang } from "@/configs/app/language";

const ForgotPasswordLanding = async ({ params }: { params: { lang: Lang } }) => {
  const ForgotPasswordComponent = await detectComponentsResponsive(
    ForgotPasswordMobile,
    ForgotPasswordIpad,
    ForgotPasswordDesktop
  );

  return <ForgotPasswordComponent params={params} />;
};

export default ForgotPasswordLanding;

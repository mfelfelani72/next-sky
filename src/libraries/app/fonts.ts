/**
 * @Author: Mohammad Felfelani
 * @Email: mfelfelani72@gmail.com
 * @Team:
 * @Date: 2025-10-07 09:42:26
 * @Description:
 */

import localFont from "next/font/local";

export const spaceGrotesk = localFont({
  src: [
    {
      path: "../../../public/shared/fonts/SpaceGrotesk-Light.ttf",
      weight: "300",
      style: "normal",
    },
    {
      path: "../../../public/shared/fonts/SpaceGrotesk-Regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../../public/shared/fonts/SpaceGrotesk-Medium.ttf",
      weight: "500",
      style: "normal",
    },
    {
      path: "../../../public/shared/fonts/SpaceGrotesk-SemiBold.ttf",
      weight: "600",
      style: "normal",
    },
    {
      path: "../../../public/shared/fonts/SpaceGrotesk-Bold.ttf",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-space-grotesk",
  display: "swap",
  preload: true,
});

export const iranSans = localFont({
  src: [
    {
      path: '../../../public/shared/fonts/IranSans_UltraLight.ttf',
      weight: '300',
      style: 'normal',
    },
    {
      path: '../../../public/shared/fonts/IranSans_Light.ttf',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../../../public/shared/fonts/IranSans_Medium.ttf',
      weight: '500',
      style: 'normal',
    },
    {
      path: '../../../public/shared/fonts/IranSans_Bold.ttf',
      weight: '700',
      style: 'normal',
    },
  ],
  variable: '--font-iranSans',
  display: 'swap',
})

export const satoshi = localFont({
  src: [
    {
      path: "../../../public/shared/fonts/Satoshi-Light.otf",
      weight: "300",
      style: "normal",
    },
    {
      path: "../../../public/shared/fonts/Satoshi-Regular.otf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../../public/shared/fonts/Satoshi-Medium.otf",
      weight: "500",
      style: "normal",
    },
    {
      path: "../../../public/shared/fonts/Satoshi-Bold.otf",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-satoshi",
  display: "swap",
  preload: true,
});
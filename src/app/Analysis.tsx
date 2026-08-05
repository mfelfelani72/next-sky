/*
 * @Author: Mohammad mfelfelani72@gmail.com
 * @Date: 2026-07-12 07:39:24
 * @LastEditors: Mohammad mfelfelani72@gmail.com
 * @LastEditTime: 2026-07-13 07:36:31
 * @FilePath: /next-sky-dev/src/app/[lang]/Analysis.tsx
 * @Description:
 */
"use client";


export default function Analysis() {
  return (
    <>
      {/* umami */}
      {process.env.NODE_ENV === "production" && process.env.NEXT_PUBLIC_UMAMI_SCRIPT && process.env.NEXT_PUBLIC_UMAMI_RECORDER && process.env.NEXT_PUBLIC_UMAMI_ID && <>
        <script defer src={process.env.NEXT_PUBLIC_UMAMI_SCRIPT} data-website-id={process.env.NEXT_PUBLIC_UMAMI_ID}></script>
        <script defer src={process.env.NEXT_PUBLIC_UMAMI_RECORDER} data-website-id={process.env.NEXT_PUBLIC_UMAMI_ID}></script>
      </>}
    </>
  );
}
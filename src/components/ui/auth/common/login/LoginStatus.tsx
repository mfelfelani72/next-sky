/*
 * @Author: Mohammad Felfelani
 * @Email: mfelfelani72@gmail.com
 * @Team:
 * @Date: 2025-12-14 13:12:21
 * @Description:
 */

"use client";

import { useTranslation } from "@/hooks/useTranslation";

// Components

import { LogIn } from "lucide-react";
import LocalizedLink from "@/components/base/LocalizedLink";
import UserAvatar from "@/components/ui/user/common/UserAvatar";
import { Button } from "forma-ui";
import TooltipWrapper from "@/components/ui/core/TooltipWrapper";
import UserMenu from "@/components/ui/user/common/UserMenu";

// Functions

import { isLoginClient } from "@/libs/isLoginClient";

// Zustand

import { useLangStore } from "forma-li";
import { useUserStore } from "@/stores/UserStore";

const LoginStatus = () => {
  // Hooks

  const { t } = useTranslation();

  // states

  const dir = useLangStore((state) => state.dir);
  const { user } = useUserStore();

  return (
    <>
      {!isLoginClient() ? (
        <LocalizedLink href={"/auth/login"} className="w-auto">
          <Button className="relative overflow-hidden group rounded-xl border-2 border-primary-400 dark:border-primary-500 cursor-pointer h-11 bg-white text-primary-400 hover:bg-white text-sm shadow-md transition-all duration-300 transform hover:scale-105 active:scale-95">
            <span className="relative z-10 flex items-center justify-center gap-1">
              {t("login")}
            </span>
          </Button>
        </LocalizedLink>
      ) : (
        <TooltipWrapper
          key="more1"
          closeMode="both"
          expandable
          expandDirection={"bottom-left"}
          expandedContent={<UserMenu />}
        >
          <div
            className={`${!user ? "pointer-events-none" : "pointer-events-auto"}`}
          >
            <UserAvatar className={"flex-row-reverse"} />
          </div>
        </TooltipWrapper>
      )}
    </>
  );
};

export default LoginStatus;

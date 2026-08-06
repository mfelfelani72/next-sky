/*
 * @Author: Mohammad Felfelani
 * @Email: mfelfelani72@gmail.com
 * @Team:
 * @Date: 2025-12-31 06:00:17
 * @Description:
 */

import { useTranslation } from "@/hooks/useTranslation";

// Components

import LocalizedLink from "@/components/base/LocalizedLink";
import { Button } from "forma-ui";

// Hooks

import { CloseModal } from "forma-ui";

const AlertLoginRegister = () => {
  // Hooks

  const { t } = useTranslation();

  return (
    <div className="flex flex-col items-center justify-center gap-10 h-32">
      <div className="text-2xl font-bold text-Neutral-500 dark:text-Neutral-100">
        {t("first_login_register")}
      </div>

      <div className="flex flex-row gap-4">
        <LocalizedLink
          
          onClick={() => CloseModal("app-modal")}
          href={"/auth/register"}
          className="w-full"
        >
          <Button className="w-full mdd:w-44 h-10 transition-all flex flex-row justify-center items-center rounded-2xl bg-primary-400 dark:bg-primary-400 hover:bg-primary-300 focus:bg-primary-500 focus:outline-none select-none text-white cursor-pointer">
            {t("register")}
          </Button>
        </LocalizedLink>

        <LocalizedLink
          
          onClick={() => CloseModal("app-modal")}
          href={"/auth/login"}
          className="w-full"
        >
          <Button className="rounded-2xl border border-secondary-50 text-base font-bold cursor-pointer w-full mdd:w-44 h-10 bg-secondary-50 dark:bg-[#28263A] hover:bg-Neutral-100 dark:hover:bg-gray-800 text-Neutral-500 dark:text-white focus:bg-Neutral-200 dark:focus:bg-Neutral-600">
            {t("login")}
          </Button>
        </LocalizedLink>
      </div>
    </div>
  );
};

export default AlertLoginRegister;

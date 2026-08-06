/*
 * @Author: Mohammad Felfelani
 * @Email: mfelfelani72@gmail.com
 * @Team:
 * @Date: 2025-12-31 07:59:15
 * @Description:
 */

"use client";

import { useState, type ChangeEvent } from "react";
import { useTranslation } from "@/hooks/app/useTranslation";

// Components

import { InputPassword, TelegramIcon, InputMobileIntl } from "forma-ui";
import LocalizedLink from "@/components/base/LocalizedLink";



const LoginForm = () => {
  // Hooks

  const { t } = useTranslation();


  // States
  return (
    <form
      className="flex flex-col h-full  animate-in fade-in slide-in-from-bottom-4 duration-500 justify-between"
    >
      <div>
        <div className="flex flex-col">
          <InputMobileIntl
            id="phone"
            label={<div className="xs:text-[16px]">{t("phone_number")}</div>}
            validate={""}
            pattern=".*"
            
           
          />
          <InputPassword
            id="password"
            label={<div className="mt-10 xs:text-[16px]">{t("password")}</div>}
            validate={t("invalid_password")}
            placeholder={t("enter_your_password")}
         
            className={
              "flex justify-between h-11 rounded-lg xl:placeholder:text-sm xs:placeholder:text-xs shadow-inner"
            }
          />
        </div>
        {false && (
          <div className="flex items-center justify-between flex-wrap gap-2 mt-10">
            <label className="flex items-center gap-2 cursor-pointer group">
              <div className="relative w-4 h-4">
                <input
                  name="remember_me"
                  type="checkbox"
                 
                  className="peer w-4 h-4 rounded border-Neutral-500/20 text-primary-400 focus:ring-2 focus:ring-primary-400/30 focus:ring-offset-0 cursor-pointer transition-all appearance-none border-2 checked:bg-primary-400 checked:border-primary-400"
                />
                {/* checkmark */}
                <svg
                  className="absolute inset-0 w-4 h-4 pointer-events-none opacity-0 peer-checked:opacity-100 transition-opacity"
                  viewBox="0 0 16 16"
                  fill="none"
                >
                  <path
                    d="M3 8l3.5 3.5L13 5"
                    stroke="white"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <span className="text-sm text-Neutral-500/70 group-hover:text-Neutral-500 transition-colors select-none">
                {t("remember_me")}
              </span>
            </label>
          </div>
        )}
      </div>

      
    </form>
  );
};

export default LoginForm;

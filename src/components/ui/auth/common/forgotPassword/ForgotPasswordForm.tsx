/*
 * @Author: Mohammad Felfelani
 * @Email: mfelfelani72@gmail.com
 * @Team:
 * @Date: 2025-12-31 07:59:15
 * @Description: Login Form with social login & register link
 */

"use client";

import { useState, type ChangeEvent } from "react";

// Components

import { InputEmail } from "forma-ui";
import LocalizedLink from "@/components/base/LocalizedLink";

// Hooks

import { useTranslation } from "@/hooks/app/useTranslation";

const ForgotPasswordForm = () => {
  // Hooks

  const { t } = useTranslation();

  // States

  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate login
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col h-full w-full animate-in fade-in slide-in-from-bottom-4 duration-500 justify-between"
    >
      <div>
        <div className="flex flex-col">
          <InputEmail
            id="email"
            label={
              <div className="xs:text-[16px] text-Neutral-100">
                {t("email")}
              </div>
            }
            validate={t("invalid_email")}
            placeholder={t("enter_your_email")}
            className={
              "flex justify-between h-10 rounded-lg xl:placeholder:text-sm xs:placeholder:text-xs shadow-inner bg-white/20 border-Neutral-200 text-white placeholder:text-Neutral-100"
            }
          />
        </div>
      </div>
      <div>
        {/* Register Link */}
        <p className="text-center mt-2 text-sm text-Neutral-100">
          {t("dont_have_account")}{" "}
          <LocalizedLink
            href="/auth/register"
            className="text-primary-400 hover:text-primary-300 font-medium transition-colors"
          >
            {t("create_account")}
          </LocalizedLink>
        </p>
        {/* Login Button */}
        <button
          type="submit"
          disabled={isLoading}
          className="w-full mt-2 py-3 rounded-lg bg-linear-to-r from-primary-400 to-primary-500 text-white font-semibold text-sm hover:shadow-lg hover:shadow-primary-400/30 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? (
            <span className="flex items-center justify-center gap-2">
              <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                  fill="none"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                />
              </svg>
              {t("loading")}
            </span>
          ) : (
            t("send")
          )}
        </button>
      </div>
    </form>
  );
};

export default ForgotPasswordForm;

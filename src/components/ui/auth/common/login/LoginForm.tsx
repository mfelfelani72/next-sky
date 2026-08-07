/*
 * @Author: Mohammad Felfelani
 * @Email: mfelfelani72@gmail.com
 * @Team:
 * @Date: 2025-12-31 07:59:15
 * @Description: Login Form with social login & register link
 */

"use client";

import { useState, type ChangeEvent } from "react";
import { useTranslation } from "@/hooks/app/useTranslation";

// Components
import { InputPassword, InputEmail } from "forma-ui";
import LocalizedLink from "@/components/base/LocalizedLink";

// Google SVG Icon Component
const GoogleIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="18"
    height="18"
    viewBox="0 0 18 18"
  >
    <g fill="none" fillRule="evenodd">
      <path
        fill="#4285F4"
        d="M17.64 9.205c0-.639-.057-1.252-.164-1.841H9v3.481h4.844a4.14 4.14 0 0 1-1.796 2.716v2.259h2.908c1.702-1.567 2.684-3.875 2.684-6.615z"
      />
      <path
        fill="#34A853"
        d="M9 18c2.43 0 4.467-.806 5.956-2.18l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 0 0 9 18z"
      />
      <path
        fill="#FBBC05"
        d="M3.964 10.71A5.41 5.41 0 0 1 3.682 9c0-.593.102-1.17.282-1.71V4.958H.957A8.996 8.996 0 0 0 0 9c0 1.452.348 2.827.957 4.042l3.007-2.332z"
      />
      <path
        fill="#EA4335"
        d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 0 0 .957 4.958L3.964 7.29C4.672 5.163 6.656 3.58 9 3.58z"
      />
    </g>
  </svg>
);

const LoginForm = () => {
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
              <div className="xs:text-[16px] text-Neutral-100">{t("email")}</div>
            }
            validate={t("invalid_email")}
            placeholder={t("enter_your_email")}
            className={
              "flex justify-between h-10 rounded-lg xl:placeholder:text-sm xs:placeholder:text-xs shadow-inner bg-white/20 border-Neutral-200 text-white placeholder:text-Neutral-100"
            }
          />
          <InputPassword
            id="password"
            label={
              <div className="mt-6 xs:text-[16px] text-Neutral-100">
                {t("password")}
              </div>
            }
            validate={t("invalid_password")}
            placeholder={t("enter_your_password")}
            className={
              "flex justify-between h-10 rounded-lg xl:placeholder:text-sm xs:placeholder:text-xs shadow-inner bg-white/20 border-Neutral-200 text-white placeholder:text-Neutral-100"
            }
          />
        </div>

        {/* Forgot Password Link */}
        <div className="flex justify-end mt-2">
          <LocalizedLink
            href="/auth/forgot-password"
            className="text-xs text-Neutral-100 hover:text-primary-400 transition-colors"
          >
            {t("forgot_password")}
          </LocalizedLink>
        </div>
      </div>
      <div>
        {/* Divider */}
        <div className="flex items-center gap-4 mt-6">
          <div className="flex-1 h-px bg-Neutral-100" />
          <span className="text-xs text-Neutral-100">{t("or_continue_with")}</span>
          <div className="flex-1 h-px bg-Neutral-100" />
        </div>

        {/* Social Login Buttons */}
        <div className="flex gap-3 mt-2">
          {/* Google */}
          <button
            type="button"
            className="flex-1 flex items-center justify-center gap-2 py-2 rounded-lg border border-Neutral-200 bg-white/20 hover:bg-white/30 transition-all duration-300 text-Neutral-100 cursor-pointer"
          >
            <GoogleIcon />
            <span className="text-sm">{t("google")}</span>
          </button>
        </div>

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
            t("login")
          )}
        </button>
      </div>
    </form>
  );
};

export default LoginForm;

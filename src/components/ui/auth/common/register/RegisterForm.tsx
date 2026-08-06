/*
 * @Author: Mohammad Felfelani
 * @Email: mfelfelani72@gmail.com
 * @Team:
 * @Date: 2025-12-31 07:59:15
 * @Description:
 */

"use client";

import { useState, type ChangeEvent } from "react";
import { useTranslation } from "@/hooks/useTranslation";

// Components

import {
  InputMobileIntl,
  InputPassword,
  InputRePassword,
  TelegramIcon,
} from "forma-ui";
import LocalizedLink from "@/components/base/LocalizedLink";

// Constants

import { countries, defaultCountry } from "@/constants/auth/countries";

// Hooks

import { useRegisterForm } from "@/hooks/auth/register/useRegisterForm";

const RegisterForm = () => {
  // States

  const [phoneNumber, setPhoneNumber] = useState("");

  // Hooks

  const { t } = useTranslation();

  const {
    formData,
    isSubmitting,
    progress,
    handleChange,
    setPhone,
    setCountry,
    setPassword,
    setRePassword,
    handleSubmit,
    errors,
    isRePasswordValid,
  } = useRegisterForm();

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col h-full animate-in fade-in slide-in-from-bottom-4 duration-500 justify-between"
    >
      <div className="flex flex-col">
        <InputMobileIntl
          id="phone"
          label={<div className="xs:text-[16px]">{t("phone_number")}</div>}
          value={formData?.phone}
          validate={""}
          pattern=".*"
          onChange={(value: string, country: any) => {
            setPhone(value);
            setCountry(country);
          }}
          onClear={() => {
            setPhone("");
            setCountry(null as any);
          }}
          countries={countries}
          defaultCountry={defaultCountry}
          disabled={false}
          placeholder={defaultCountry?.example}
          searchPlaceholder={t("search_country")}
          noResultText={t("no_country_found")}
          countrySelectorAriaLabel={t("select_country")}
          clearButtonAriaLabel={t("clear")}
          showMobileIcon={true}
          showClearButton={true}
          showSearchIcon={true}
          showCountryFlag={true}
          showCountryCode={true}
          showDropdownArrow={true}
          showCountryItemFlag={true}
          showCountryItemCode={true}
          showCountryItemCheck={true}
          classNames={{
            container: "left-to-right",
            label:
              "block rtl:right-to-left text-sm font-medium text-Neutral-300 dark:text-Neutral-100 mb-1 px-2",
            wrapper: "relative",
            inputWrapper: "relative flex items-center",
            input:
              "w-full rtl:pl-35 rtl:pr-10 ltr:pl-35 ltr:pr-10 autofill-input peer placeholder-Neutral-200 py-3 rounded-2xl bg-secondary-50 dark:bg-background-light border border-secondary-100 focus:outline-none focus:ring-0 focus:border-secondary-400 justify-between items-center text-Neutral-500 dark:text-white relative flex h-11 rounded-lg xl:placeholder:text-sm xs:placeholder:text-xs shadow-inner",
            clearButton:
              "absolute right-to-left rtl:right-0 ltr:right-0 mr-3 top-1/2 -translate-y-1/2 p-1 rounded-full transition-colors duration-200 z-10",
            clearIcon:
              "w-5 h-5 text-gray-400 dark:text-gray-500 cursor-pointer",
            mobileIconWrapper:
              "absolute rtl:left-0 rtl:ml-3 ltr:left-0 ltr:ml-3 top-1/2 -translate-y-1/2 pointer-events-none z-10",
            mobileIcon: "w-5 h-5 text-gray-400 dark:text-gray-500",
            countrySelector:
              "absolute rtl:left-12 ltr:left-12 top-1/2 -translate-y-1/2 w-19 flex items-center gap-1 px-2 py-1 bg-secondary-200 rounded-lg hover:bg-secondary-300 transition-colors duration-200 text-sm font-medium text-Neutral-400 dark:text-white disabled:opacity-50 disabled:cursor-not-allowed z-10",
            countryFlag: "text-base",
            countryCode: "text-xs font-mono",
            dropdownArrow: "text-xl transition-transform duration-200",
            dropdown:
              "absolute z-50 mt-2 w-full max-h-80 overflow-hidden bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl shadow-2xl",
            searchWrapper:
              "sticky top-0 bg-white dark:bg-gray-900 p-3 border-b border-gray-200 dark:border-gray-700",
            searchIcon:
              "absolute rtl:left-3 ltr:left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 dark:text-gray-500",
            searchInput:
              "w-full rtl:pl-9 rtl:pr-9 ltr:pl-9 ltr:pr-9 py-2 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg focus:border-blue-500 dark:focus:border-blue-400 focus:ring-2 focus:ring-blue-500/20 dark:focus:ring-blue-400/20 transition-all duration-200 text-sm text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500",
            searchClear:
              "absolute rtl:right-2 ltr:right-2 top-1/2 -translate-y-1/2 p-0.5 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-200",
            searchClearIcon: "w-4 h-4 text-gray-400 dark:text-gray-500",
            countryList: "max-h-60 overflow-y-auto p-1",
            countryItem:
              "flex w-full items-center gap-2 px-3 py-2.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200 rtl:text-left ltr:text-left text-gray-700 dark:text-gray-300 selected:bg-blue-50 dark:selected:bg-blue-900/20",
            countryItemFlag: "text-lg",
            countryItemName: "flex-1 text-sm",
            countryItemCode: "text-xs text-gray-400 dark:text-gray-500",
            countryItemCheck: "text-blue-500 dark:text-blue-400 font-bold",
            noResult:
              "py-8 text-center text-sm text-gray-400 dark:text-gray-500",
            error: "mt-1.5 text-sm text-red-500 dark:text-red-400",
            errorText: "",
            validate:
              "hidden peer-invalid:block mt-1.5 text-sm text-orange-500 dark:text-orange-400",
            validateText: "",
          }}
        />

        <InputPassword
          id="password"
          label={
            <div className="xs:text-[14px] mt-6 -mx-3">{t("password")}</div>
          }
          validate={t("invalid_password")}
          value={formData.password}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setPassword(e.target.value)
          }
          variant="change_password"
          error={errors?.password}
          onClear={() => setPassword("")}
          className="
          flex justify-between
          h-11 rounded-lg
          xl:placeholder:text-sm
          xs:placeholder:text-xs
          shadow-inner
          hover:shadow-inner"
        />

        <InputRePassword
          id="confirm-password"
          value={formData.rePassword}
          label={
            <div className="xs:text-[14px] mt-6 -mx-3">
              {t("confirm_password")}
            </div>
          }
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setRePassword(e.target.value)
          }
          onClear={() => setRePassword("")}
          validate={t("invalid_re_password")}
          passwordFieldId="password"
          className="autofill-input peer placeholder-Neutral-200 w-full px-[2.7rem] py-3 bg-secondary-50 dark:bg-background-light border border-secondary-100 focus:outline-none focus:ring-0 focus:border-secondary-400 items-center text-Neutral-500 dark:text-white relative invalid:focus:border-Error-400 invalid:border-Error-400 flex justify-between h-11 rounded-lg xl:placeholder:text-sm xs:placeholder:text-xs shadow-inner hover:shadow-inner"
        />
      </div>

      <div className="flex items-center justify-between flex-wrap gap-2 pt-8">
        {false && (
          <>
            <label className="flex items-center gap-2 cursor-pointer group">
              <div className="relative w-4 h-4 shrink-0">
                <input
                  name="remember_me"
                  type="checkbox"
                  checked={formData.rememberMe}
                  onChange={handleChange}
                  className="peer w-4 h-4 rounded border-Neutral-500/20 text-primary-400 focus:ring-2 focus:ring-primary-400/30 focus:ring-offset-0 cursor-pointer transition-all appearance-none border-2 checked:bg-primary-400 checked:border-primary-400"
                />
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
              <span className="text-xs md:text-sm text-Neutral-500/70 group-hover:text-Neutral-500 transition-colors select-none">
                {t("remember_me")}
              </span>
            </label>
            (
            <LocalizedLink
              href="/forgot-password"
              className="text-xs md:text-sm text-primary-400 hover:text-primary-500 font-medium transition-colors"
            >
              {t("forgot_password?")}
            </LocalizedLink>
            )
          </>
        )}
      </div>

      {errors?.length > 0 && (
        <div className="p-3 md:p-4 rounded-xl bg-Error-50 border border-Error-200 animate-in fade-in slide-in-from-top-2 duration-300">
          <p className="">{t(errors[0]?.auth)}</p>
        </div>
      )}

      <div className="flex-1 min-h-2 md:min-h-4" />

      <div className="space-y-2 md:space-y-4 mt-auto">
        <button
          type="submit"
          disabled={
            !formData.phone ||
            !formData.password ||
            !formData.rePassword ||
            formData.password !== formData.rePassword ||
            isSubmitting
          }
          className="w-full xs:py-2.5 py-3 md:py-3 rounded-xl font-semibold text-white text-sm md:text-base
            disabled:opacity-50 disabled:cursor-not-allowed
            transition-all duration-200 active:scale-[0.98]
            bg-linear-to-r from-primary-400 to-primary-500
            shadow-lg shadow-primary-400/25
            hover:shadow-xl hover:shadow-primary-400/40
            hover:brightness-105
            disabled:shadow-md cursor-pointer"
        >
          <span className="flex items-center justify-center gap-2">
            {isSubmitting ? (
              <>
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                <span>{t("register")}...</span>
              </>
            ) : (
              t("register")
            )}
          </span>
        </button>

        <LocalizedLink
          href="https://t.me/AimoonHub_bot"
          target="_blank"
          className="block w-full"
        >
          <button
            type="button"
            className="
            w-full
            px-4 xs:py-2.5 py-3 md:py-3 rounded-xl
            font-semibold
            text-white
            text-sm
            md:text-base
            transition-all
            duration-200
            active:scale-[0.98]
            bg-linear-to-br
            from-Tertiary-400 via-Tertiary-500 to-Tertiary-600
            hover:brightness-110
            shadow-lg shadow-Tertiary-600/25
            hover:shadow-xl hover:shadow-Tertiary-600/40
            flex items-center justify-center gap-2 cursor-pointer"
          >
            <TelegramIcon className="w-5 h-5 shrink-0 text-white" />
            <span className="truncate">{t("register_with_telegram")}</span>
          </button>
        </LocalizedLink>

        <p className="text-center text-xs md:text-sm text-Neutral-500/60 px-2">
          {t("already_have_account?")}{" "}
          <LocalizedLink
            href="/auth/login"
            className="text-primary-400 hover:text-primary-500 font-semibold transition-colors"
          >
            {t("login")}
          </LocalizedLink>
        </p>
      </div>
    </form>
  );
};

export default RegisterForm;

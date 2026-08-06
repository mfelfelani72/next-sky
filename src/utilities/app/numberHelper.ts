/**
 * @Author: Mohammad Felfelani
 * @Email: mfelfelani72@gmail.com
 * @Team:
 * @Date: 2025-11-02 06:07:10
 * @Description:
 */

// Configs
import { Lang, languages } from "@/configs/language";

export const numberHelper = (
  num: number | string,
  lang: Lang,
  format?: "abbreviate" | "full",
) => {
  const locale = languages[lang].schemaLocale;
  const number = Number(num);

  if (!Number.isFinite(number)) {
    return new Intl.NumberFormat(locale).format(0);
  }

  if (format !== "abbreviate") {
    return new Intl.NumberFormat(locale).format(number);
  }

  const formatCompactNumber = (value: number, suffix: string) => {
    const formatted = new Intl.NumberFormat(locale, {
      minimumFractionDigits: 0,
      maximumFractionDigits: 1,
    }).format(value);

    return `${formatted}${suffix}`;
  };

  if (number >= 1_000_000_000) {
    return formatCompactNumber(number / 1_000_000_000, "B");
  }

  if (number >= 1_000_000) {
    return formatCompactNumber(number / 1_000_000, "M");
  }

  if (number >= 1_000) {
    return formatCompactNumber(number / 1_000, "K");
  }

  return new Intl.NumberFormat(locale).format(number);
};

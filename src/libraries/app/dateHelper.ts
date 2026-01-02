/**
 * @Author: Mohammad Felfelani
 * @Email: mfelfelani72@gmail.com
 * @Team:
 * @Date: 2025-12-13 07:21:26
 * @Description:
 */

// Hooks

import { useTranslation } from "@/hooks/useTranslation";

// Interfaces

export type DateHelperKind = "regular" | "chart" | "difference";
export type DateHelperFormat = "full" | "date" | "time";
export type DateHelperType = "AD-date" | "SH-date" | "LH-date";

export function dateHelper(
  stampDate: number,
  kind: "regular" | "chart" | "difference" = "regular",
  second: boolean = false,
  format: "full" | "date" | "time" = "full",
  type: "AD-date" | "SH-date" | "LH-date" = "AD-date"
): string {
  // hooks
  const { t } = useTranslation();

  let location: string;
  let result: string = "";

  // Determine locale
  if (type == "AD-date") location = "en-US";
  else if (type == "SH-date") location = "fa-IR";
  else if (type == "LH-date") location = "ar-SA";
  else location = "en-US"; // fallback

  // Create Date object
  const date = new Date(stampDate * 1000);

  if (kind == "regular" && format == "full") {
    if (type == "AD-date") {
      result = date.toLocaleString(location, {
        year: "numeric",
        month: "short",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      });
    } else if (type == "SH-date") {
      const dateString = date.toLocaleString(location, {
        year: "numeric",
        month: "long",
        day: "2-digit",
        calendar: "persian",
      } as Intl.DateTimeFormatOptions);
      const timeString = date.toLocaleString(location, {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      });
      result = `${dateString} , ${timeString}`;
    } else if (type == "LH-date") {
      const dateString = date.toLocaleString(location, {
        year: "numeric",
        month: "long",
        day: "2-digit",
        calendar: "islamic",
      } as Intl.DateTimeFormatOptions);
      const timeString = date.toLocaleString(location, {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      });
      result = `${dateString} , ${timeString}`;
    }
  } else if (kind == "regular" && format == "date") {
    if (type == "AD-date") {
      result = date.toLocaleString(location, {
        year: "numeric",
        month: "short",
        day: "2-digit",
      });
    } else if (type == "SH-date") {
      result = date.toLocaleString(location, {
        year: "numeric",
        month: "long",
        day: "2-digit",
        calendar: "persian",
      } as Intl.DateTimeFormatOptions);
    } else if (type == "LH-date") {
      result = date.toLocaleString(location, {
        year: "numeric",
        month: "long",
        day: "2-digit",
        calendar: "islamic",
      } as Intl.DateTimeFormatOptions);
    }
  } else if (kind == "regular" && format == "time") {
    if (type == "AD-date") {
      result = date.toLocaleString(location, {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      });
    } else {
      result = date.toLocaleString(location, {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      });
    }
  } else if (kind == "chart") {
    result = date.toLocaleString(location, {
      month: "short",
      day: "2-digit",
    });
  } else if (kind == "difference") {
    const currentDate = new Date();

    // Calculate time difference
    const diffInMs = currentDate.getTime() - date.getTime();

    // Convert to time units
    const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));
    const diffInHours = Math.floor(
      (diffInMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    const diffInMinutes = Math.floor(
      (diffInMs % (1000 * 60 * 60)) / (1000 * 60)
    );
    const diffInSeconds = Math.floor((diffInMs % (1000 * 60)) / 1000);

    if (diffInHours > 11) {
      if (type == "AD-date") {
        result = date.toLocaleString(location, {
          year: "numeric",
          month: "short",
          day: "2-digit",
          hour: "2-digit",
          minute: "2-digit",
          hour12: true,
        });
      } else if (type == "SH-date") {
        const dateString = date.toLocaleString(location, {
          year: "numeric",
          month: "long",
          day: "2-digit",
          calendar: "persian",
        } as Intl.DateTimeFormatOptions);
        const timeString = date.toLocaleString(location, {
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
        });
        result = `${dateString} , ${timeString}`;
      } else if (type == "LH-date") {
        const dateString = date.toLocaleString(location, {
          year: "numeric",
          month: "long",
          day: "2-digit",
          calendar: "islamic",
        } as Intl.DateTimeFormatOptions);
        const timeString = date.toLocaleString(location, {
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
        });
        result = `${dateString} , ${timeString}`;
      }
    } else {
      // Prepare an array of all units
      const units: Array<{
        value: number;
        singular: string;
        plural: string;
      }> = [
        { value: diffInDays, singular: "day_singular", plural: "day_plural" },
        {
          value: diffInHours,
          singular: "hour_singular",
          plural: "hour_plural",
        },
        {
          value: diffInMinutes,
          singular: "minute_singular",
          plural: "minute_plural",
        },
        {
          value: second ? diffInSeconds : 0,
          singular: "second_singular",
          plural: "second_plural",
        },
      ];

      // Filter out zero values and take only the first two
      const nonZeroUnits = units.filter((u) => u.value > 0).slice(0, 2);

      let stringTime = nonZeroUnits
        .map((u) => `${u.value} ${t(u.value < 2 ? u.singular : u.plural)}`)
        .join(" ");

      // Final phrase
      if (nonZeroUnits.length === 0) {
        result = t("exactly_now");
      } else {
        result = `${stringTime} ${t("ago")}`;
      }
    }
  }

  return result;
}

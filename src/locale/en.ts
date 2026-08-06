/**
 * @Author: Mohammad Felfelani
 * @Email: mfelfelani72@gmail.com, sinasalehimilani2016@gmail.com
 * @Team:
 * @Date: 2025-10-07 07:53:42
 * @Description:
 */

import { getMeta } from "./meta/index";
import { getLicenseTranslations } from "./licenses/index";

import global_en from "./global/en.json";
import home_en from "./home/en.json";
import auth_en from "./auth/en.json";

const meta = await getMeta("en");

const en = {
  ...meta,
  ...getLicenseTranslations("en"),

  ...global_en,
  ...home_en,
  ...auth_en,
};

export default en;

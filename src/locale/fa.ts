/**
 * @Author: Mohammad Felfelani
 * @Email: mfelfelani72@gmail.com, sinasalehimilani2016@gmail.com
 * @Team:
 * @Date: 2025-10-07 07:53:42
 * @Description:
 */

import { getMeta } from "./meta/index";
import { getLicenseTranslations } from "./licenses/index";

import global_fa from "./global/fa.json";
import home_fa from "./home/fa.json";
import auth_fa from "./auth/fa.json";

const meta = await getMeta("en");

const en = {
  ...meta,
  ...getLicenseTranslations("fa"),

  ...global_fa,
  ...home_fa,
  ...auth_fa,
};

export default en;

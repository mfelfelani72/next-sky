/**
 * @Author: Mohammad Felfelani
 * @Email: mfelfelani72@gmail.com
 * @Team:
 * @Date: 2025-10-07 07:53:42
 * @Description:
 */

import meta_en from "./meta/en.json";
import meta_home_en from "./meta/home/en.json";


import global_en from "./global/en.json";
import home_en from "./home/en.json";
import auth_en from "./auth/en.json";

const en = {
  meta: meta_en,
  meta_home: meta_home_en,

  ...global_en,
  ...home_en,
  ...auth_en,
};

export default en;

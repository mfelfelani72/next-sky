/**
 * @Author: Mohammad Felfelani
 * @Email: mfelfelani72@gmail.com
 * @Team:
 * @Date: 2025-10-07 07:54:08
 * @Description:
 */

import meta_fa from "./meta/fa.json";
import meta_home_fa from "./meta/home/fa.json";

import global_fa from "./global/fa.json";
import home_fa from "./home/fa.json";
import auth_fa from "./auth/fa.json";

const fa = {
  meta: meta_fa,
  meta_home: meta_home_fa,

  ...global_fa,
  ...home_fa,

  ...auth_fa,
};

export default fa;

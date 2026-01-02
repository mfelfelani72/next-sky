/**
 * @Author: Mohammad Felfelani
 * @Email: mfelfelani72@gmail.com
 * @Team:
 * @Date: 2025-11-25 08:14:33
 * @Description:
 */

import meta_ar from "./meta/ar.json";
import meta_home_ar from "./meta/home/ar.json";
import meta_news_ar from "./meta/news/ar.json";
import meta_about_ar from "./meta/about/ar.json";

import global_ar from "./global/ar.json";
import home_ar from "./home/ar.json";
import auth_ar from "./auth/ar.json";

const ar = {
  meta: meta_ar,
  meta_home: meta_home_ar,
  meta_news: meta_news_ar,
  meta_about: meta_about_ar,

  ...global_ar,
  ...home_ar,
  ...auth_ar,
};

export default ar;

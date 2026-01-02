/**
 * @Author: Mohammad Felfelani
 * @Email: mfelfelani72@gmail.com
 * @Team:
 * @Date: 2025-10-07 07:54:08
 * @Description:
 */

import meta_fa from "./meta/fa.json";
import meta_home_fa from "./meta/home/fa.json";
import meta_news_fa from "./meta/news/fa.json";
import meta_about_fa from "./meta/about/fa.json";

import global_fa from "./global/fa.json";
import home_fa from "./home/fa.json";
import news_fa from "./news/fa.json";
import about_fa from "./about/fa.json";
import coin_fa from "./coin/fa.json";
import dashboard_fa from "./dashboard/fa.json";
import auth_fa from "./auth/fa.json";

const fa = {
  meta: meta_fa,
  meta_home: meta_home_fa,
  meta_news: meta_news_fa,
  meta_about: meta_about_fa,

  ...global_fa,
  ...home_fa,
  ...news_fa,
  ...about_fa,
  ...coin_fa,
  ...dashboard_fa,
  ...auth_fa,
};

export default fa;

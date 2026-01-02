/**
 * @Author: Mohammad Felfelani
 * @Email: mfelfelani72@gmail.com
 * @Team:
 * @Date: 2025-10-07 07:53:42
 * @Description:
 */

import meta_en from "./meta/en.json";
import meta_home_en from "./meta/home/en.json";
import meta_news_en from "./meta/news/en.json";
import meta_about_en from "./meta/about/en.json";

import global_en from "./global/en.json";
import home_en from "./home/en.json";
import news_en from "./news/en.json";
import coin_en from "./coin/en.json";
import about_en from "./about/en.json";
import dashboard_en from "./dashboard/en.json";
import auth_en from "./auth/en.json";

const en = {
  meta: meta_en,
  meta_home: meta_home_en,
  meta_news: meta_news_en,
  meta_about: meta_about_en,

  ...global_en,
  ...home_en,
  ...news_en,
  ...about_en,
  ...coin_en,
  ...dashboard_en,
  ...auth_en,
};

export default en;

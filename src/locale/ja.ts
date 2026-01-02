/**
 * @Author: Mohammad Felfelani
 * @Email: mfelfelani72@gmail.com
 * @Team:
 * @Date: 2025-12-07 14:05:23
 * @Description:
 */

import meta_ja from "./meta/ja.json";
import meta_home_ja from "./meta/home/ja.json";
import meta_news_ja from "./meta/news/ja.json";
import meta_about_ja from "./meta/about/ja.json";

import global_ja from "./global/ja.json";
import home_ja from "./home/ja.json";
import news_ja from "./news/ja.json";
import about_ja from "./about/ja.json";
import coin_ja from "./coin/ja.json";
import dashboard_ja from "./dashboard/ja.json";
import auth_ja from "./auth/ja.json";

const ja = {
  meta: meta_ja,
  meta_home: meta_home_ja,
  meta_news: meta_news_ja,
  meta_about: meta_about_ja,

  ...global_ja,
  ...home_ja,
  ...news_ja,
  ...about_ja,
  ...coin_ja,
  ...dashboard_ja,
  ...auth_ja,
};

export default ja;

/**
 * @Author: Mohammad Felfelani
 * @Email: mfelfelani72@gmail.com
 * @Team:
 * @Date: 2025-10-12 08:39:25
 * @Description:
 */

export type ValidOgType = 'article' | 'website' | 'profile' | 'book' | 'music.song' | 'music.album' | 'music.playlist' | 'music.radio_station' | 'video.movie' | 'video.episode' | 'video.tv_show' | 'video.other';
export interface BaseMeta {
  title: string;
  description: string;
  keywords?: string[];
  publisher?: string;
  twitter?: TwitterMeta;
  openGraph?: OpenGraphMeta;
  robots?: {
    index?: boolean;
    follow?: boolean;
    archive?: boolean;
  };
}

export interface PageMeta extends BaseMeta {
  canonicalUrl?: string;
}

export type OpenGraphMeta = {
  title: string;
  description: string;
  url?: string;
  locale?: string;
  siteName?: string;
  type?: string;
  images?: string;
};

export type TwitterMeta = {
  card?: string;
  title?: string;
  description?: string;
  images?: string;
  site?: string;
};

export interface ContentData {
  title: string;
  description: string;
  image: string;
  datePublished: string;
  dateModified: string;
  author?: string;
  provider?: string;
  originalSourceUrl?: string;
  newsKeywords?: string[];
  postCount?: number;
  pageType?: string;
  robots?: {
    index?: boolean;
    follow?: boolean;
    archive?: boolean;

  };
  ogType?: string;
  twitterSite?: string;
}
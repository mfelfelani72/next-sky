/*
 * @Author: Mohammad mfelfelani72@gmail.com
 * @Date: 2026-07-13 09:21:47
 * @LastEditors: Mohammad mfelfelani72@gmail.com
 * @LastEditTime: 2026-07-13 09:22:12
 * @FilePath: /next-aimoonhub-dev/src/Interfaces/sitemap.ts
 * @Description:
 */

export interface SitemapGeneralInfo {
    total_news: number;
    page_size: number;
    total_pages: number;
}

export interface SitemapGeneralInfoResponse {
    return: boolean;
    data: SitemapGeneralInfo;
}

export interface SitemapAlternate {
    slug: string;
}

export interface SitemapNewsItem {
    id: string;
    slug: string;
    locale: string;
    translation_group: number;
    status: "published";
    updated_at: string;
    alternates: Record<string, SitemapAlternate>;
}

export interface SitemapNewsResponse {
    return: boolean;
    page: number;
    page_size: number;
    total: number;
    results: SitemapNewsItem[];
}
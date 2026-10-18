import type { ArticleContent } from "./article-content.types";

export interface CreateArticleDto {
  title: string;
  slug: string;
  content: ArticleContent;
  status?: "draft" | "published";
}

export interface UpdateArticleDto {
  title?: string;
  slug?: string;
  content?: ArticleContent;
  status?: "draft" | "published";
}

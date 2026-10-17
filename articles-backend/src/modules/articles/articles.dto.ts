
export interface CreateArticleDto {
  title: string;
  slug: string;
  content: string;
  status?: "draft" | "published";
}

export interface UpdateArticleDto {
  title?: string;
  slug?: string;
  content?: string;
  status?: "draft" | "published";
}

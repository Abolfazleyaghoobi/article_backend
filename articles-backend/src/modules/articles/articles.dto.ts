export interface CreateArticleDto {
  title: string;
  slug: string;
  content: string;
  status?: "draft" | "published";
  userId: number;
}
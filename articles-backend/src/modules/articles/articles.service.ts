import { articleRepository } from "./articles.repository";
import type { CreateArticleDto } from "./articles.dto";
import { AppError } from "../../common/errors/app.error";

// create a new article
export const createArticle = async (data: CreateArticleDto) => {
  const existingArticle = await articleRepository.findOneBy({
    slug: data.slug,
  });

  if (existingArticle) {
    throw new AppError("این آدرس مقاله قبلاً ثبت شده است", 409);
  }

  const article = articleRepository.create({
    title: data.title,
    slug: data.slug,
    content: data.content,
    status: data.status ?? "draft",
    userId: data.userId,
  });

  return articleRepository.save(article);
};

// get all articles

export const getAllArticles = async (
  page = 1,
  limit = 10,
  status?: "draft" | "published",
) => {
  const safePage = Math.max(1, Math.floor(page));
  const safeLimit = Math.min(50, Math.max(1, Math.floor(limit)));

  const [articles, total] = await articleRepository.findAndCount({
    where: status ? { status } : {},
    order: { createdAt: "DESC" },
    skip: (safePage - 1) * safeLimit,
    take: safeLimit,
  });

  return {
    data: articles,
    pagination: {
      page: safePage,
      limit: safeLimit,
      total,
      totalPages: Math.ceil(total / safeLimit),
    },
  };
};
// get article by id
export const getArticleById = async (id: number) => {
  const article = await articleRepository.findOneBy({ id });

  if (!article) {
    throw new AppError("مقاله پیدا نشد", 404);
  }

  return article;
};

// update article by id
export const updateArticle = async (
  id: number,
  data: Partial<CreateArticleDto>,
) => {
  const article = await getArticleById(id);

  if (data.slug && data.slug !== article.slug) {
    const existingArticle = await articleRepository.findOneBy({
      slug: data.slug,
    });

    if (existingArticle) {
      throw new AppError("این آدرس مقاله قبلاً ثبت شده است", 409);
    }
  }

  articleRepository.merge(article, {
    title: data.title,
    slug: data.slug,
    content: data.content,
    status: data.status,
  });

  return articleRepository.save(article);
};

// delete article by id
export const deleteArticle = async (id: number) => {
  const article = await getArticleById(id);

  await articleRepository.remove(article);
};
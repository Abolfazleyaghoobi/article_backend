import { articleRepository } from "./articles.repository";
import type { CreateArticleDto,UpdateArticleDto } from "./articles.dto";
import { AppError } from "../../common/errors/app.error";

const parseArticleContent = (content: string) => {
  return JSON.parse(content);
};

// create a new article

export const createArticle = async (
  data: CreateArticleDto,
  userId: number,
) => {
  const existingArticle = await articleRepository.findOneBy({
    slug: data.slug,
  });

  if (existingArticle) {
    throw new AppError("این آدرس مقاله قبلاً ثبت شده است", 409);
  }

  const article = articleRepository.create({
    title: data.title,
    slug: data.slug,
    content: JSON.stringify(data.content),
    status: data.status ?? "draft",
    userId,
  });

  return articleRepository.save(article);
};


// get all articles


export const getAllArticles = async (
  page = 1,
  limit = 10,
  status?: "draft" | "published",
  search?: string,
  viewerUserId?: number,
) => {
  const safePage = Math.max(1, Math.floor(page));
  const safeLimit = Math.min(50, Math.max(1, Math.floor(limit)));

  const query = articleRepository
    .createQueryBuilder("article")
    .orderBy("article.createdAt", "DESC")
    .skip((safePage - 1) * safeLimit)
    .take(safeLimit);

  if (viewerUserId !== undefined) {
    query.andWhere(
      "(article.status = :published OR article.userId = :viewerUserId)",
      {
        published: "published",
        viewerUserId,
      },
    );
  } else {
    query.andWhere("article.status = :published", {
      published: "published",
    });
  }

  if (status) {
    query.andWhere("article.status = :status", { status });
  }

  if (search?.trim()) {
    query.andWhere("article.title LIKE :search", {
      search: `%${search.trim()}%`,
    });
  }

  const [articles, total] = await query.getManyAndCount();

  return {
    data: articles.map((article) => ({
  ...article,
  content: parseArticleContent(article.content),
})),
    pagination: {
      page: safePage,
      limit: safeLimit,
      total,
      totalPages: Math.ceil(total / safeLimit),
    },
  };
};

// get article by id

export const getArticleById = async (
  id: number,
  viewerUserId?: number,
) => {
  const article = await articleRepository.findOneBy({ id });

  if (!article) {
    throw new AppError("مقاله پیدا نشد", 404);
  }

  if (
    article.status !== "published" &&
    article.userId !== viewerUserId
  ) {
    throw new AppError("مقاله پیدا نشد", 404);
  }
return {
  ...article,
  content: parseArticleContent(article.content),
};
};


// update article by id

export const updateArticle = async (
  id: number,
  data: UpdateArticleDto,
  userId: number,
) => {
  const article = await getArticleById(id);

  if (article.userId !== userId) {
    throw new AppError("شما اجازه ویرایش این مقاله را ندارید", 403);
  }

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
  content:
  data.content !== undefined
    ? JSON.stringify(data.content)
    : undefined,
    status: data.status,
  });

  return articleRepository.save(article);
};

// delete article by id

export const deleteArticle = async (
  id: number,
  userId: number,
) => {
  const article = await getArticleById(id);

  if (article.userId !== userId) {
    throw new AppError("شما اجازه حذف این مقاله را ندارید", 403);
  }

  await articleRepository.remove(article);
};

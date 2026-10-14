import type { Request, Response, NextFunction } from "express";

import {
  createArticle,
  deleteArticle,
  getAllArticles,
  getArticleById,
  updateArticle,
} from "./articles.service";

import {
  createArticleSchema,
  updateArticleSchema,
} from "./articles.validation";
import { AppError } from "../../common/errors/app.error";

// craate article controller
export const createArticleController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const data = createArticleSchema.parse(req.body);
    const article = await createArticle(data);

    res.status(201).json({
      success: true,
      data: article,
    });
  } catch (error) {
    next(error);
  }
};

// get all articles controller
export const getAllArticlesController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const page = Number(req.query.page ?? 1);
    const limit = Number(req.query.limit ?? 10);

    if (
      !Number.isInteger(page) ||
      page < 1 ||
      !Number.isInteger(limit) ||
      limit < 1
    ) {
      throw new AppError(
        "شماره صفحه یا تعداد نتایج معتبر نیست",
        400,
      );
    }

    const result = await getAllArticles(page, limit);

    res.status(200).json({
      success: true,
      ...result,
    });
  } catch (error) {
    next(error);
  }
};
// get article by id controller
export const getArticleByIdController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const id = Number(req.params.id);

    if (!Number.isInteger(id) || id < 1) {
      throw new AppError("شناسه مقاله معتبر نیست", 400);
    }

    const article = await getArticleById(id);

    res.status(200).json({
      success: true,
      data: article,
    });
  } catch (error) {
    next(error);
  }
};

// update article controller
export const updateArticleController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const id = Number(req.params.id);

    if (!Number.isInteger(id) || id < 1) {
      throw new AppError("شناسه مقاله معتبر نیست", 400);
    }

    const data = updateArticleSchema.parse(req.body);
    const article = await updateArticle(id, data);

    res.status(200).json({
      success: true,
      data: article,
    });
  } catch (error) {
    next(error);
  }
};

// delete article controller
export const deleteArticleController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const id = Number(req.params.id);

    if (!Number.isInteger(id) || id < 1) {
      throw new AppError("شناسه مقاله معتبر نیست", 400);
    }

    await deleteArticle(id);

    res.status(204).send();
  } catch (error) {
    next(error);
  }
};

import type { Request, Response, NextFunction } from "express";
import { z } from "zod";
import { AppError } from "../../common/errors/app.error";
import {
  createTag,
  getAllTags,
  getTagById,
  updateTag,
  deleteTag,
} from "./tags.service";
const createTagSchema = z.object({
  name: z.string().trim().min(2, "نام تگ باید حداقل ۲ کاراکتر باشد").max(100),
});

export const createTagController = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const result = createTagSchema.safeParse(req.body);

    if (!result.success) {
      throw new AppError("اطلاعات تگ معتبر نیست", 400);
    }

    const tag = await createTag(result.data.name);

    res.status(201).json({
      success: true,
      data: tag,
    });
  } catch (error) {
    next(error);
  }
};

export const getAllTagsController = async (
  _req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const tags = await getAllTags();

    res.status(200).json({
      success: true,
      data: tags,
    });
  } catch (error) {
    next(error);
  }
};

export const getTagByIdController = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const id = Number(req.params.id);

    if (!Number.isInteger(id) || id < 1) {
      throw new AppError("شناسه تگ معتبر نیست", 400);
    }

    const tag = await getTagById(id);

    res.status(200).json({
      success: true,
      data: tag,
    });
  } catch (error) {
    next(error);
  }
};





export const updateTagController = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const id = Number(req.params.id);

    if (!Number.isInteger(id) || id < 1) {
      throw new AppError("شناسه تگ معتبر نیست", 400);
    }

    const result = createTagSchema.safeParse(req.body);

    if (!result.success) {
      throw new AppError("اطلاعات تگ معتبر نیست", 400);
    }

    const tag = await updateTag(id, result.data.name);

    res.status(200).json({
      success: true,
      data: tag,
    });
  } catch (error) {
    next(error);
  }
};





export const deleteTagController = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const id = Number(req.params.id);

    if (!Number.isInteger(id) || id < 1) {
      throw new AppError("شناسه تگ معتبر نیست", 400);
    }

    const tag = await deleteTag(id);

    res.status(200).json({
      success: true,
      message: "تگ با موفقیت حذف شد",
      data: tag,
    });
  } catch (error) {
    next(error);
  }
};

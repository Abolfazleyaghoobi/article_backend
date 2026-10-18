
import type { Request, Response, NextFunction } from "express";
import { readFile, unlink } from "node:fs/promises";
import { AppError } from "../../common/errors/app.error";

const isValidImage = (buffer: Buffer): boolean => {
  // JPEG
  if (
    buffer.length >= 3 &&
    buffer[0] === 0xff &&
    buffer[1] === 0xd8 &&
    buffer[2] === 0xff
  ) {
    return true;
  }

  // PNG
  if (
    buffer.length >= 8 &&
    buffer.subarray(0, 8).equals(
      Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]),
    )
  ) {
    return true;
  }

  // GIF
  if (
    buffer.length >= 6 &&
    ["GIF87a", "GIF89a"].includes(buffer.toString("ascii", 0, 6))
  ) {
    return true;
  }

  // WebP
  if (
    buffer.length >= 12 &&
    buffer.toString("ascii", 0, 4) === "RIFF" &&
    buffer.toString("ascii", 8, 12) === "WEBP"
  ) {
    return true;
  }

  return false;
};

export const validateImageContent = async (
  req: Request,
  _res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    if (!req.file) {
      next();
      return;
    }

    const buffer = await readFile(req.file.path);

    if (!isValidImage(buffer)) {
      await unlink(req.file.path);
      throw new AppError("محتوای فایل، تصویر معتبر نیست", 400);
    }

    next();
  } catch (error) {
    next(error);
  }
};

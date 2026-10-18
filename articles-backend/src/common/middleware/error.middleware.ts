
import type { ErrorRequestHandler } from "express";
import multer from "multer";
import { AppError } from "../errors/app.error";

export const errorMiddleware: ErrorRequestHandler = (
  err,
  _req,
  res,
  _next,
) => {
  if (err instanceof AppError) {
    res.status(err.statusCode).json({
      success: false,
      message: err.message,
    });
    return;
  }

  if (err instanceof multer.MulterError) {
    if (err.code === "LIMIT_FILE_SIZE") {
      res.status(413).json({
        success: false,
        message: "حجم تصویر نباید بیشتر از ۵ مگابایت باشد",
      });
      return;
    }

    res.status(400).json({
      success: false,
      message: "خطا در دریافت فایل آپلودشده",
    });
    return;
  }

  console.error(err);

  res.status(500).json({
    success: false,
    message: "خطای داخلی سرور",
  });
};

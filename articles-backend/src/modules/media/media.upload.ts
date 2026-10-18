
import multer from "multer";
import path from "node:path";
import { randomUUID } from "node:crypto";
import { AppError } from "../../common/errors/app.error";

const uploadDirectory = path.resolve(
  process.cwd(),
  "articles-backend/uploads",
);

const allowedMimeTypes = new Set([
 
  "image/webp",
 
]);

export const imageUpload = multer({
  storage: multer.diskStorage({
    destination: (_req, _file, callback) => {
      callback(null, uploadDirectory);
    },
    filename: (_req, file, callback) => {
      const extension = path.extname(file.originalname).toLowerCase();
      callback(null, `${randomUUID()}${extension}`);
    },
  }),
  limits: {
    fileSize: 5 * 1024 * 1024,
    files: 1,
  },
  fileFilter: (_req, file, callback) => {
    if (!allowedMimeTypes.has(file.mimetype)) {
      callback(
        new AppError("فقط تصاویر webp مجاز می باشند", 400),
      );
      return;
    }

    callback(null, true);
  },
});

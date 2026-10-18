
import { Router } from "express";
import { authenticate } from "../../common/middleware/auth.middleware";
import { uploadImage } from "./media.controller";
import { imageUpload } from "./media.upload";
import { validateImageContent } from "./media.validation";
const mediaRouter = Router();

mediaRouter.post(
  "/images",
  authenticate,
  imageUpload.single("image"),
  validateImageContent,
  uploadImage,
);

export { mediaRouter };

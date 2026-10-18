
import { Router } from "express";
import { authenticate } from "../../common/middleware/auth.middleware";
import { uploadImage } from "./media.controller";
import { imageUpload } from "./media.upload";

const mediaRouter = Router();

mediaRouter.post(
  "/images",
  authenticate,
  imageUpload.single("image"),
  uploadImage,
);

export { mediaRouter };

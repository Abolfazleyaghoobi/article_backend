
import { Router } from "express";
import { authenticate } from "../../common/middleware/auth.middleware";
import {
  createTagController,
  getAllTagsController,
  getTagByIdController,
  updateTagController,
  deleteTagController,
} from "./tags.controller";
const tagsRouter = Router();

// دریافت همه تگ‌ها
tagsRouter.get("/", getAllTagsController);

// دریافت یک تگ با شناسه
tagsRouter.get("/:id", getTagByIdController);

// ساخت تگ جدید؛ فقط کاربران واردشده
tagsRouter.post("/", authenticate, createTagController);



tagsRouter.patch("/:id", authenticate, updateTagController);

tagsRouter.delete("/:id", authenticate, deleteTagController);
export { tagsRouter };

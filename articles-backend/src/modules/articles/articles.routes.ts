
import { Router } from "express";
import { authenticate } from "../../common/middleware/auth.middleware";
import {
  createArticleController,
  deleteArticleController,
  getAllArticlesController,
  getArticleByIdController,
  updateArticleController,
} from "./articles.controller";

const router = Router();

// Public routes
router.get("/", getAllArticlesController);
router.get("/:id", getArticleByIdController);

// Protected routes
router.post("/", authenticate, createArticleController);
router.patch("/:id", authenticate, updateArticleController);
router.delete("/:id", authenticate, deleteArticleController);

export default router;

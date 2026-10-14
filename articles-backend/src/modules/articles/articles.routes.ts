import { Router } from "express";
import {
  createArticleController,
  deleteArticleController,
  getAllArticlesController,
  getArticleByIdController,
  updateArticleController,
} from "./articles.controller";
const router = Router();

router.post("/", createArticleController);
router.get("/", getAllArticlesController);
router.get("/:id", getArticleByIdController);
router.patch("/:id", updateArticleController);
router.delete("/:id", deleteArticleController);
export default router;
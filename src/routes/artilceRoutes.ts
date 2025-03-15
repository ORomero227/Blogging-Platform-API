import express from "express";
import {
  createArticle,
  deleteArticle,
  getArticleById,
  getArticles,
  updateArticle,
} from "../controllers/articleController";

const router = express.Router();

router.get("/articles", getArticles);
router.get("/articles/:id", getArticleById);
router.post("/articles", createArticle);
router.put("/articles/:id", updateArticle);
router.delete("/articles/:id", deleteArticle);

export default router;

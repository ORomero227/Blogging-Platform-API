import { Request, Response } from "express";
import { Article } from "../models/article";
import {
  fetchArticles,
  fetchArticleById,
  createNewArticle,
  deleteSelectedArticle,
  updateSelectedArticle,
} from "../services/articleService";

export const getArticles = async (_req: Request, res: Response) => {
  // Logic to fetch and return articles from the database
  try {
    const articles = await fetchArticles();
    res.json(articles);
  } catch (error) {
    console.log("Error fetching all the articles", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getArticleById = async (req: Request, res: Response) => {
  // Logic to fetch and return article by ID from database
  try {
    const article = await fetchArticleById(Number(req.params.id));
    if (!article) {
      res.status(404).json({ message: "Article not found" });
    } else {
      res.json(article);
    }
  } catch (error) {
    console.log("Error fetching the requested article", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const createArticle = async (req: Request, res: Response) => {
  // Logic to create a new article in the database
  const newArticle: Article = {
    title: req.body.title,
    body: req.body.body,
  };

  try {
    const articleInserted = await createNewArticle(newArticle);
    if (!articleInserted) {
      res.status(500).json({ message: "Internal server error" });
    } else {
      res.status(201).json(articleInserted);
    }
  } catch (error) {
    console.log("Error creating article", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const updateArticle = async (req: Request, res: Response) => {
  // Logic to update a article bt ID in the database
  try {
    const article = await fetchArticleById(Number(req.params.id));

    if (!article) {
      res.status(204).json({ message: "Article not found" });
    } else {
      const newValues = {
        title: req.body.title || article.title,
        body: req.body.body || article.body,
      };

      const updatedArticle = await updateSelectedArticle(article, newValues);
      res.json(updatedArticle);
    }
  } catch (error) {
    console.log("Error updating article", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const deleteArticle = async (req: Request, res: Response) => {
  // Logic to delete a article bt ID in the database
  try {
    const deleted = await deleteSelectedArticle(Number(req.params.id));
    if (!deleted) {
      res.status(404).json({ message: "Article not found" });
    } else {
      res.status(204).end();
    }
  } catch (error) {
    console.log("Error deleting article:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

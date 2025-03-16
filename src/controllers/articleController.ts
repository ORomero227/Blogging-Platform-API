import { Request, Response } from "express";
import { Article } from "../models/article";

const articles: Article[] = [];

export const getArticles = (_req: Request, res: Response) => {
  // Logic to fetch and return articles from the database
  res.json(articles);
};

export const getArticleById = (req: Request, res: Response) => {
  // Logic to fetch and return article by ID from database
  const article = articles.find((a) => a.id === parseInt(req.params.id));
  if (!article) {
    res.status(404).json({ message: "Article not found" });
  } else {
    res.json(article);
  }
};

export const createArticle = (req: Request, res: Response) => {
  // Logic to create a new article in the database
  const newArticle: Article = {
    id: articles.length + 1,
    title: req.body.title,
    body: req.body.body,
  };

  articles.push(newArticle);
  res.status(201).json(newArticle);
};

export const updateArticle = (req: Request, res: Response) => {
  // Logic to update a article bt ID in the database
  const article = articles.find((a) => a.id === parseInt(req.params.id));

  if (!article) {
    res.status(404).json({ message: "Article not found" });
  } else {
    article.title = req.body.title || article.title;
    article.body = req.body.body || article.body;

    res.json(article);
  }
};

export const deleteArticle = (req: Request, res: Response) => {
  // Logic to delete a article bt ID in the database
  const index = articles.findIndex((a) => a.id === parseInt(req.params.id));

  if (index === -1) {
    res.status(404).json({ message: "Article not found" });
  } else {
    articles.splice(index, 1);
    res.status(204).send();
  }
};

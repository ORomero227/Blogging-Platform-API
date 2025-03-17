import { ResultSetHeader, RowDataPacket } from "mysql2/promise";
import { connection } from "../config/db";
import { Article } from "../models/article";

export const fetchArticles = async (): Promise<Article[]> => {
  const conn = await connection.promise().getConnection();
  try {
    const [result] = await conn.query<RowDataPacket[]>(
      "SELECT * FROM articles"
    );
    conn.release();
    return result as Article[];
  } catch (error) {
    conn?.release();
    throw error;
  }
};

export const fetchArticleById = async (id: number): Promise<Article | null> => {
  const conn = await connection.promise().getConnection();
  try {
    const [result] = await conn.query<RowDataPacket[]>(
      "SELECT * FROM articles WHERE articles.id = ?",
      [id]
    );
    conn.release();
    return result.length > 0 ? (result[0] as Article) : null;
  } catch (error) {
    conn?.release();
    throw error;
  }
};

export const createNewArticle = async (
  newArticle: Article
): Promise<Article | null> => {
  const conn = await connection.promise().getConnection();
  try {
    const { title, body } = newArticle;

    const [result] = await conn.query<ResultSetHeader>(
      "INSERT INTO articles (title, body) VALUES (?,?)",
      [title, body]
    );

    const newArticleId = result.insertId;
    conn.release();

    return fetchArticleById(newArticleId);
  } catch (error) {
    conn?.release();
    throw error;
  }
};

export const updateSelectedArticle = async (
  article: Article,
  newValues: { title: string; body: string }
): Promise<Article | null> => {
  const conn = await connection.promise().getConnection();
  try {
    const { title, body } = newValues;

    await conn.query<ResultSetHeader>(
      "UPDATE articles SET articles.title = ?, articles.body = ? WHERE articles.id = ?",
      [title, body, article.id]
    );
    conn.release();

    return fetchArticleById(Number(article.id));
  } catch (error) {
    conn?.release();
    throw error;
  }
};

export const deleteSelectedArticle = async (id: number): Promise<boolean> => {
  const conn = await connection.promise().getConnection();
  try {
    const article = await fetchArticleById(id);

    if (!article) {
      return false;
    } else {
      const [result] = await conn.query<ResultSetHeader>(
        "DELETE FROM articles WHERE articles.id = ?",
        [article.id]
      );
      conn.release();
      return result.affectedRows > 0;
    }
  } catch (error) {
    conn?.release();
    throw error;
  }
};

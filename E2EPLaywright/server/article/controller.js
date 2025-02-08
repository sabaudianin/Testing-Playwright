import { Article, articles } from "./model.js";
import { users } from "../user/model.js";

export function createArticle(req, res) {
  const authorId = req.userId;
  const author = users.find((user) => user.id === authorId);

  if (!author) {
    return res.status(401).json({ message: "User Not Found" });
  }

  const { title, description, body, tagList } = req.body.article;

  if (!title || !description || !body) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const article = Article.create({
    title,
    description,
    body,
    tagList,
    author,
  });

  return res.status(200).json({ article: article.toArticleResponse(author) });
}

export function deleteArticle(req, res) {
  const userId = req.userId;
  const { slug } = req.params;
  const loginUser = users.find((user) => user.id === userId);

  if (!loginUser) {
    return res.status(401).json({ message: "User Not Found" });
  }

  const article = articles.find((article) => article.slug === slug);

  if (!article) {
    return res.status(404).json({ message: "Article Not Found" });
  }

  if (article.author.id !== loginUser.id) {
    return res
      .status(403)
      .json({ message: "Only the author can delete his article" });
  }

  const index = articles.indexOf(article);

  if (index > -1) {
    articles.splice(index, 1);
  }

  return res.status(200).json({ message: "Article successfully deleted" });
}

export function favoriteArticle(req, res) {
  const userId = req.userId;
  const { slug } = req.params;
  const loginUser = users.find((user) => user.id === userId);

  if (!loginUser) {
    return res.status(401).json({ message: "User Not Found" });
  }

  const article = articles.find((article) => article.slug === slug);

  if (!article) {
    return res.status(404).json({ message: "Article Not Found" });
  }

  if (!loginUser.favouriteArticles.includes(article.id)) {
    loginUser.favouriteArticles.push(article.id);
    article.updateFavoriteCount("add");
  }

  return res
    .status(200)
    .json({ article: article.toArticleResponse(loginUser) });
}

export function unfavoriteArticle(req, res) {
  const userId = req.userId;
  const { slug } = req.params;
  const loginUser = users.find((user) => user.id === userId);

  if (!loginUser) {
    return res.status(401).json({ message: "User Not Found" });
  }

  const article = articles.find((article) => article.slug === slug);

  if (!article) {
    return res.status(404).json({ message: "Article Not Found" });
  }

  loginUser.unfavorite(article.id);
  article.updateFavoriteCount();

  return res
    .status(200)
    .json({ article: article.toArticleResponse(loginUser) });
}

export function getArticleWithSlug(req, res) {
  const { slug } = req.params;
  const article = articles.find((article) => article.slug === slug);

  if (!article) {
    return res.status(404).json({ message: "Article Not Found" });
  }

  return res.status(200).json({ article: article.toArticleResponse(false) });
}

export function updateArticle(req, res) {
  const userId = req.userId;
  const { slug } = req.params;
  const { article: articleUpdates } = req.body;
  const loginUser = users.find((user) => user.id === userId);

  if (!loginUser) {
    return res.status(401).json({ message: "User Not Found" });
  }

  const article = articles.find((article) => article.slug === slug);

  if (!article) {
    return res.status(404).json({ message: "Article Not Found" });
  }

  if (articleUpdates.title) {
    article.title = articleUpdates.title;
  }

  if (articleUpdates.description) {
    article.description = articleUpdates.description;
  }

  if (articleUpdates.body) {
    article.body = articleUpdates.body;
  }

  if (articleUpdates.tagList) {
    article.tagList = articleUpdates.tagList;
  }

  return res
    .status(200)
    .json({ article: article.toArticleResponse(loginUser) });
}

export function feedArticles(req, res) {
  const userId = req.userId;
  const loginUser = users.find((user) => user.id === userId);
  let limit = parseInt(req.query.limit, 10) ?? 20;
  let offset = parseInt(req.query.offset, 10) ?? 0;

  if (!loginUser) {
    return res.status(401).json({ message: "User Not Found" });
  }

  const filteredArticles = articles.filter((article) =>
    loginUser.followingUsers.includes(article.author.id)
  );
  const paginatedArticles = filteredArticles.slice(offset, offset + limit);

  return res.status(200).json({
    articles: paginatedArticles.map((article) =>
      article.toArticleResponse(loginUser)
    ),
    articlesCount: filteredArticles.length,
  });
}

export function listArticles(req, res) {
  let limit = parseInt(req.query.limit, 10) ?? 20;
  let offset = parseInt(req.query.offset, 10) ?? 0;
  let filteredArticles = articles;

  if (req.query.tag) {
    filteredArticles = filteredArticles.filter((article) =>
      article.tagList.includes(req.query.tag)
    );
  }

  if (req.query.author) {
    const author = users.find((user) => user.username === req.query.author);

    if (author) {
      filteredArticles = filteredArticles.filter(
        (article) => article.author.id === author.id
      );
    }
  }

  if (req.query.favorited) {
    const favoriter = users.find(
      (user) => user.username === req.query.favorited
    );

    if (favoriter) {
      filteredArticles = filteredArticles.filter((article) =>
        favoriter.favouriteArticles.includes(article.id)
      );
    }
  }

  const paginatedArticles = filteredArticles.slice(offset, offset + limit);
  const loginUser = users.find((user) => user.id === req.userId);

  return res.status(200).json({
    articles: paginatedArticles.map((article) =>
      article.toArticleResponse(loginUser || false)
    ),
    articlesCount: filteredArticles.length,
  });
}

export default {
  createArticle,
  deleteArticle,
  favoriteArticle,
  unfavoriteArticle,
  getArticleWithSlug,
  updateArticle,
  feedArticles,
  listArticles,
};

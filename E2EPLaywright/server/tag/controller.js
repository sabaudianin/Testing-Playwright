import { Article } from "../article/model.js";

export function getTags(req, res) {
  const tags = Article.getUniqueTags("tagList");

  res.status(200).json({
    tags,
  });
}

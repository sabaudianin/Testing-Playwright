import { Article } from "../article/model.js";
import { User } from "../user/model.js";
import { Comment } from "./model.js";

export function addCommentsToArticle(req, res) {
  const id = req.userId;
  const commenter = User.findById(id);

  if (!commenter) {
    return res.status(401).json({
      message: "User Not Found",
    });
  }

  const { slug } = req.params;
  const article = Article.findOne({ slug });

  if (!article) {
    return res.status(401).json({
      message: "Article Not Found",
    });
  }

  const { articleId, authorId, comment } = req.body;
  const newComment = Comment.create({
    body: comment,
    authorId,
    articleId,
  });

  article.addComment(newComment.id);

  return res.status(200).json({
    comment: newComment.toCommentResponse(commenter),
  });
}

export function getCommentsFromArticle(req, res) {
  const { slug } = req.params;
  const article = Article.findOne({ slug });

  if (!article) {
    return res.status(401).json({
      message: "Article Not Found",
    });
  }

  const loggedin = req.loggedin;

  if (loggedin) {
    const loginUser = User.findById(req.userId);

    return res.status(200).json({
      comments: article.comments.map((commentId) => {
        const commentObj = Comment.findById(commentId);

        return commentObj.toCommentResponse(loginUser);
      }),
    });
  }

  return res.status(200).json({
    comments: article.comments.map((commentId) => {
      const commentObj = Comment.findById(commentId);
      const temp = commentObj.toCommentResponse(false);

      return temp;
    }),
  });
}

export function deleteComment(req, res) {
  const userId = req.userId;
  const commenter = User.findById(userId);

  if (!commenter) {
    return res.status(401).json({
      message: "User Not Found",
    });
  }

  const { slug, id } = req.params;
  const article = Article.findOne({ slug });

  if (!article) {
    return res.status(401).json({
      message: "Article Not Found",
    });
  }

  const comment = Comment.findById(Number(id));

  if (comment.authorId.toString() === commenter.id.toString()) {
    article.removeComment(comment.id);
    Comment.deleteOne({ id: comment.id });

    return res.status(200).json({
      message: "comment has been successfully deleted!!!",
    });
  }

  return res.status(403).json({
    error: "only the author of the comment can delete the comment",
  });
}

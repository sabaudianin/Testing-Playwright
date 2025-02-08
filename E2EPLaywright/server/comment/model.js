import { users } from "../user/model.js";

export const comments = [];

export class Comment {
  constructor({ body, authorId, articleId }) {
    this.id = Comment.generateId();
    this.body = body;
    this.authorId = authorId;
    this.articleId = articleId;
    this.createdAt = new Date();
    this.updatedAt = new Date();
  }

  static create(commentData) {
    const comment = new Comment(commentData);

    comments.push(comment);

    return comment;
  }

  static findById(commentId) {
    return comments.find((comment) => comment.id === commentId);
  }

  static deleteOne({ id }) {
    const index = comments.findIndex((comment) => comment.id === id);

    if (index !== -1) {
      comments.splice(index, 1);
    }
  }

  toCommentResponse(user) {
    const authorObj = users.find((user) => user.id === this.authorId);

    return {
      id: this.id,
      body: this.body,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      author: authorObj ? authorObj.toProfileJSON(user) : null,
    };
  }

  static generateId() {
    return comments.length + 1;
  }
}

comments.push(
  new Comment({
    body: "Great article!",
    authorId: 2,
    articleId: 1,
  })
);

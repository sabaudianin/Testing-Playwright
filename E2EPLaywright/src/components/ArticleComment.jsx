import React from "react";
import { Link } from "react-router-dom";
import {
  useArticleCommentQuery,
  useAuth,
  useDeleteCommentMutation,
} from "../hooks";

export function ArticleComment({ comment }) {
  const data = useArticleComment(comment);

  return (
    <div className="card">
      <div className="card-block">
        <p className="card-text">{data.body}</p>
      </div>
      {data.id && (
        <div className="card-footer">
          <Link
            to={`/profile/${data.author?.username}`}
            className="comment-author"
          >
            <img src={data.author?.image} className="comment-author-img" />
          </Link>
          &nbsp;
          <Link
            to={`/profile/${data.author?.username}`}
            className="comment-author"
          >
            {data.author?.username}
          </Link>
          <span className="date-posted">
            {new Date(data.createdAt).toDateString()}
          </span>
          {data.canDelete && (
            <span className="mod-options">
              <i className="ion-trash-a" onClick={data.handleOnClick} />
            </span>
          )}
        </div>
      )}
    </div>
  );
}

function useArticleComment(comment) {
  const { data } = useArticleCommentQuery({ comment });
  const { authUser } = useAuth();
  const { author, body, createdAt, id } = data.comment;
  const { mutate } = useDeleteCommentMutation();
  const canDelete = author?.username === authUser?.username;

  const handleOnClick = () => data.mutate({ commentId: id });

  return {
    author,
    body,
    canDelete,
    createdAt,
    handleOnClick,
    id,
    mutate,
  };
}

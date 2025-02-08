import React from "react";
import { Link } from "react-router-dom";
import { useArticleQuery, useAuth } from "../hooks";
import { DeleteArticleButton } from "./DeleteArticleButton";
import { FavoriteArticleButton } from "./FavoriteArticleButton";

export function ArticleMeta() {
  const data = useArticleMeta();
  const { author } = data;

  return (
    <div className="article-meta">
      <Link to={`/profile/${author?.username}`}>
        <img src={author?.image} />
      </Link>
      <div className="info">
        <Link to={`/profile/${author?.username}`} className="author">
          {author?.username}
        </Link>
        <span className="date">{new Date(data.createdAt).toDateString()}</span>
      </div>
      {data.canUpdate ? (
        <span>
          <Link
            className="btn btn-outline-secondary btn-sm"
            to={`/editor/${data.slug}`}
          >
            <i className="ion-edit" /> Edit Article
          </Link>
          &nbsp;&nbsp;
          <DeleteArticleButton />
        </span>
      ) : (
        <>
          &nbsp;&nbsp;
          <FavoriteArticleButton slug={data.slug} favorited={data.favorited}>
            &nbsp; {data.favorited ? "Unfavorite" : "Favorite"} Article{" "}
            <span className="counter">({data.favoritesCount})</span>
          </FavoriteArticleButton>
        </>
      )}
    </div>
  );
}

function useArticleMeta() {
  const { data } = useArticleQuery();
  const { authUser } = useAuth();
  const canUpdate = authUser?.username === data.author?.username;

  return { ...data.article, canUpdate };
}

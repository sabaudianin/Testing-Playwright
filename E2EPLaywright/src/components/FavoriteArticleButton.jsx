import React from "react";
import classNames from "classnames";
import { useFavoriteArticleMutation } from "../hooks";

export function FavoriteArticleButton({ slug, favorited, children, className = "" }) {
  const { mutate, isLoading } = useFavoriteArticleMutation(slug);

  return (
    <button
      type="button"
      className={classNames(
        "btn btn-sm",
        {
          "btn-outline-primary": !favorited,
          "btn-primary": favorited,
        },
        className
      )}
      onClick={() => !isLoading && mutate({ favorited })}
      disabled={isLoading}
    >
      <i className="ion-heart" />
      {children}
    </button>
  );
}

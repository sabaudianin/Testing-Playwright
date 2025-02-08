import React from "react";
import { useQueryClient } from "react-query";
import { useNavigate, useParams } from "react-router-dom";
import { useArticleQuery, useAuth, useFollowAuthorMutation } from "../hooks";
import { FollowButton } from "./FollowButton";

export function FollowAuthorButton() {
  const data = useFollowAuthorButton();

  return (
    <FollowButton
      disabled={data.isLoading}
      following={data.author?.following}
      onClick={data.handleOnClick}
      username={data.author?.username}
    />
  );
}

function useFollowAuthorButton() {
  const { slug } = useParams();
  const queryClient = useQueryClient();
  const { isAuth, authUser } = useAuth();
  const navigate = useNavigate();
  const { data } = useArticleQuery();
  const { author } = data.article;
  const queryKey = `/articles/${slug}`;
  const following = authUser?.followingUsers?.includes(author.id) ?? false;

  const { mutate, isLoading } = useFollowAuthorMutation({
    onMutate: async () => {
      const previousArticle = queryClient.getQueryData(queryKey);

      if (isAuth) {
        await queryClient.cancelQueries(queryKey);

        queryClient.setQueryData(queryKey, ({ article: currentArticle }) => ({
          article: {
            ...currentArticle,
            author: {
              ...currentArticle?.author,
              following: !following,
            },
          },
        }));
      } else {
        navigate("/login");
      }

      return { previousArticle };
    },
    onError: (err, _, context) => {
      queryClient.setQueryData(queryKey, context.previousArticle);
    },
    onSettled: () => {
      queryClient.invalidateQueries(queryKey);
      queryClient.invalidateQueries("/articles/feed");
      queryClient.invalidateQueries(`/user`);
    },
  });

  const handleOnClick = () => mutate({ following, username: author?.username });

  return {
    author,
    handleOnClick,
    isLoading,
  };
}

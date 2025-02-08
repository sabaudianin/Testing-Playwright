import React from "react";
import { useQueryClient } from "react-query";
import { useNavigate } from "react-router-dom";
import { useAuth, useFollowAuthorMutation, useProfileQuery } from "../hooks";
import { FollowButton } from "./FollowButton";

export function FollowProfileButton() {
  const data = useFollowProfileButton();

  return (
    <FollowButton
      disabled={data.isLoading}
      following={data.following}
      onClick={data.handleClick}
      username={data.username}
    />
  );
}

function useFollowProfileButton() {
  const { data } = useProfileQuery();
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { isAuth, authUser } = useAuth();
  const { username } = data.profile;
  const queryKey = `/profiles/${username}`;
  const following = data.profile.following;

  const { mutate, isLoading } = useFollowAuthorMutation({
    onMutate: async () => {
      const previousProfile = queryClient.getQueryData(queryKey);

      if (isAuth) {
        await queryClient.cancelQueries(queryKey);

        queryClient.setQueryData(queryKey, ({ profile: currentProfile }) => ({
          profile: {
            ...currentProfile,
            following: !currentProfile.following,
          },
        }));
      } else {
        navigate("/login");
      }

      return { previousProfile };
    },
    onError: (err, _, context) => {
      queryClient.setQueryData(queryKey, context.previousProfile);
    },
    onSettled: () => {
      queryClient.invalidateQueries(queryKey);
      queryClient.invalidateQueries("/articles/feed");
    },
  });

  const handleClick = () => mutate({ following, username });

  return {
    isLoading,
    following,
    handleClick,
    username,
  };
}

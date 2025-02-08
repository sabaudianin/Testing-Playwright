import axios from "axios";
import { useMutation } from "react-query";

export function useFollowAuthorMutation(config) {
  return useMutation((/** @type {{following: boolean, username: string}} */ { following, username }) => {
    return axios[following ? "delete" : "post"](`/profiles/${username}/follow`);
  }, config);
}

import { useQuery } from "react-query";
import { useParams } from "react-router-dom";

export function useArticleCommentsQuery() {
  const { slug } = useParams();

  return useQuery(`/articles/${slug}/comments`, {
    placeholderData: {
      comments: [],
    },
  });
}

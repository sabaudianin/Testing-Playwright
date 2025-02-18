import { useQuery } from "react-query";
import { useParams } from "react-router-dom";

export function useArticleQuery({ article } = { article: null }) {
  const { slug } = useParams();

  return useQuery(`/articles/${article ? article?.slug : slug}`, {
    enabled: !!slug || !!article?.slug,
    placeholderData: { article: {} },
    initialData: article ? { article } : undefined,
  });
}

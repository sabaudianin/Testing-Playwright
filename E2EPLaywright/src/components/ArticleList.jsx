import React from "react";
import { useState } from "react";
import { isEmpty, isNil } from "lodash-es";
import useDeepCompareEffect from "use-deep-compare-effect";
import { useArticlesQuery } from "../hooks";
import { ArticlePreview } from "./ArticlePreview";

export function ArticleList({ filters }) {
  const data = useArticleList(filters);

  if (data.isFetching) {
    return <p className="article-preview">Loading articles...</p>;
  }

  if (data.isError) {
    return <p className="article-preview">Loading articles failed :(</p>;
  }

  if (data.isSuccess && isEmpty(data?.articles)) {
    return <p className="article-preview">No articles are here... yet.</p>;
  }

  return (
    <>
      {data.articles.map((article) => (
        <ArticlePreview key={article.slug} article={article} />
      ))}
      {data.pages > 1 && (
        <nav>
          <ul className="pagination">
            {Array.from({ length: pages }, (_, index) => (
              <li
                className={offset === index ? "page-item active" : "page-item"}
                key={index}
              >
                <button
                  type="button"
                  className="page-link"
                  onClick={data.changeOffset(index)}
                >
                  {index + 1}
                </button>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </>
  );
}

function useArticleList(filters = INITIAL_FILTERS) {
  const [offset, setOffset] = useState(0);
  const { data, isFetching, isError, isSuccess } = useArticlesQuery({
    filters: { ...filters, offset },
  });
  const pages = Math.ceil((data?.articlesCount ?? null) / LIMIT);

  useDeepCompareEffect(() => {
    if (!isNil(filters.offset)) {
      setOffset(filters.offset);
    }
  }, [filters]);

  const changeOffset = () => (offset) => setOffset(offset);

  return {
    articles: data?.articles ?? [],
    isError,
    isFetching,
    isSuccess,
    pages,
    changeOffset,
  };
}

const INITIAL_FILTERS = {
  author: null,
  favorited: null,
  tag: null,
  offset: null,
  feed: false,
};
const LIMIT = 10;

import React from "react";
import classNames from "classnames";
import { useEffect, useState } from "react";
import { ArticleList, PopularTags } from "../components";
import { useAuth } from "../hooks";

export function Home() {
  const data = useHome();

  return (
    <div className="home-page">
      <div className="banner">
        <div className="container">
          <h1 className="logo-font">conduit</h1>
          <p>A place to share your knowledge.</p>
        </div>
      </div>
      <div className="container page">
        <div className="row">
          <div className="col-md-9">
            <div className="feed-toggle">
              <ul className="nav nav-pills outline-active">
                {data.isAuth && (
                  <li className="nav-item">
                    <button
                      onClick={data.handleFeedClick}
                      type="button"
                      className={classNames("nav-link", {
                        active: data.filters.feed,
                      })}
                    >
                      Your Feed
                    </button>
                  </li>
                )}
                <li className="nav-item">
                  <button
                    type="button"
                    className={classNames("nav-link", {
                      active: !data.filters?.tag && !data.filters.feed,
                    })}
                    onClick={data.handleGlobalFeedClick}
                  >
                    Global Feed
                  </button>
                </li>
                {data.filters?.tag && (
                  <li className="nav-item">
                    <a className="nav-link active"># {data.filters.tag}</a>
                  </li>
                )}
              </ul>
            </div>
            <ArticleList filters={data.filters} />
          </div>
          <div className="col-md-3">
            <PopularTags onTagClick={data.handleTagClick} />
          </div>
        </div>
      </div>
    </div>
  );
}

function useHome() {
  const { isAuth } = useAuth();
  const [filters, setFilters] = useState({ ...INITIAL_FILTERS, feed: isAuth });

  useEffect(() => {
    setFilters({ ...INITIAL_FILTERS, feed: isAuth });
  }, [isAuth]);

  const handleTagClick = (tag) => setFilters({ ...INITIAL_FILTERS, tag });
  const handleGlobalFeedClick = () => setFilters(INITIAL_FILTERS);
  const handleFeedClick = () => setFilters({ ...INITIAL_FILTERS, feed: true });

  return {
    filters,
    isAuth,
    handleFeedClick,
    handleGlobalFeedClick,
    handleTagClick,
  };
}

const INITIAL_FILTERS = { tag: "", offset: null, feed: false };

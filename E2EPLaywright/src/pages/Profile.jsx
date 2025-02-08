import React from "react";
import classNames from "classnames";
import { useState, useCallback, useEffect } from "react";
import { Link } from "react-router-dom";
import { ArticleList, FollowProfileButton } from "../components";
import { useAuth, useProfileQuery } from "../hooks";

export function Profile() {
  const data = useProfile();

  return (
    <div className="profile-page">
      <div className="user-info">
        <div className="container">
          <div className="row">
            <div className="col-xs-12 col-md-10 offset-md-1">
              <img src={data.image} className="user-img" />
              <h4>{data.username}</h4>
              <p>{data.bio}</p>
              {data.canUpdateProfile ? (
                <Link
                  className="btn btn-sm btn-outline-secondary action-btn"
                  to="/settings"
                >
                  <i className="ion-gear-a" /> Edit Profile Settings
                </Link>
              ) : (
                <FollowProfileButton />
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="container">
        <div className="row">
          <div className="col-xs-12 col-md-10 offset-md-1">
            <div className="articles-toggle">
              <ul className="nav nav-pills outline-active">
                <li className="nav-item">
                  <button
                    onClick={data.setAuthorFilter}
                    type="button"
                    className={classNames("nav-link", {
                      active: data.filters?.author,
                    })}
                  >
                    My Articles
                  </button>
                </li>
                <li className="nav-item">
                  <button
                    onClick={() =>
                      data.setFilters({ author: "", favorited: data.username })
                    }
                    type="button"
                    className={classNames("nav-link", {
                      active: data.filters?.favorited,
                    })}
                  >
                    Favorited Articles
                  </button>
                </li>
              </ul>
            </div>
            <ArticleList filters={data.filters} />
          </div>
        </div>
      </div>
    </div>
  );
}

function useProfile() {
  const { data } = useProfileQuery();
  const { authUser } = useAuth();
  const [filters, setFilters] = useState({ author: "", favorited: "" });
  const { username, image, bio } = data.profile;
  const canUpdateProfile = authUser?.username === username;

  const setAuthorFilter = useCallback(() => {
    setFilters({ author: username, favorited: "" });
  }, [username]);

  useEffect(() => {
    setAuthorFilter();
  }, [username, setAuthorFilter]);

  return {
    bio,
    canUpdateProfile,
    filters,
    image,
    username,
    setAuthorFilter,
    setFilters,
  };
}

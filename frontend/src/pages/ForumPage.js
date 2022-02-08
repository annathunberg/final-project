import React, { useEffect } from "react";
import { useSelector, useDispatch, batch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { API_URL } from "../utils/Constants";

import { forumPosts } from "../reducers/forumPosts";
import { user } from "../reducers/user";

export const ForumPage = () => {
  const forumPostsItems = useSelector((store) => store.forumPosts.items);
  const accessToken = useSelector((store) => store.user.accessToken);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (!accessToken) {
      navigate("/login");
    }
  }, [accessToken, navigate]);

  useEffect(() => {
    const options = {
      method: "GET",
      headers: {
        Authorization: accessToken,
      },
    };

    fetch(API_URL("forumPosts"), options)
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          dispatch(forumPosts.actions.setItems(data.response));
          dispatch(forumPosts.actions.setError(null));
        } else {
          dispatch(forumPosts.actions.setItems([]));
          dispatch(forumPosts.actions.setError(data.response));
        }
      });
  }, [accessToken, dispatch]);

  const logOutUser = () => {
    batch(() => {
      dispatch(user.actions.setUsername(null));
      dispatch(user.actions.setAccessToken(null));

      localStorage.removeItem("user");
    });
  };

  return (
    <>
      <div>
        <h1>welcome to our forum</h1>
        {forumPostsItems.map((item) => (
          <div key={item._id}>{item.message}</div>
        ))}
      </div>
      <div className="logout-btn-wrapper">
        <button className="logout-btn" onClick={logOutUser}>
          Log out
        </button>
      </div>
    </>
  );
};

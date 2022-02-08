import React, { useEffect } from "react";
import { useSelector, useDispatch, batch } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

import { API_URL } from "../utils/Constants";

import { AddPost } from "../components/AddPost";
import { ForumList } from "../components/ForumList";
import { forumPosts } from "../reducers/forumPosts";
import { user } from "../reducers/user";

const ContentDiv = styled.main`
  margin: 10px;
`;

export const ForumPage = () => {
  const forumPostsItems = useSelector((store) => store.forumPosts.items);
  const categories = useSelector((store) => store.categories.items);
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
    <ContentDiv>
      <h1>welcome to our forum</h1>

      <AddPost />
      <ForumList />

      <div className="logout-btn-wrapper">
        <button className="logout-btn" onClick={logOutUser}>
          Log out
        </button>
      </div>
    </ContentDiv>
  );
};

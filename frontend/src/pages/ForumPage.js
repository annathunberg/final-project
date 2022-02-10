import React, { useEffect } from "react";
import { useSelector, useDispatch, batch } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { AddPost } from "../components/AddPost";
import { ForumList } from "../components/ForumList";
import { Header } from "../components/Header";
//import { forumPosts } from "../reducers/forumPosts";
import { user } from "../reducers/user";
import { forumPosts } from "../reducers/forumPosts";
import { getPosts } from "../utils/postsApiUtil";

const ContentDiv = styled.main`
  margin: 10px;
`;

export const ForumPage = () => {
  //const forumPostsItems = useSelector((store) => store.forumPosts.items);
  const accessToken = useSelector((store) => store.user.accessToken);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (!accessToken) {
      navigate("/login");
    } else {
      getPosts(dispatch);
    }
  }, [accessToken, navigate]);

  useEffect(() => {
    const options = {
      method: "GET",
      headers: {
        Authorization: accessToken,
      },
    };

    /*  fetch(API_URL("forumPosts"), options)
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          dispatch(forumPosts.actions.setItems(data.response));
          dispatch(forumPosts.actions.setError(null));
        } else {
          dispatch(forumPosts.actions.setItems([]));
          dispatch(forumPosts.actions.setError(data.response));
        }
      }); */
  }, [accessToken, dispatch]);

  const logOutUser = () => {
    batch(() => {
      dispatch(user.actions.setUsername(null));
      dispatch(user.actions.setUserId(null));
      dispatch(user.actions.setAccessToken(null));

      localStorage.removeItem("accessToken");
      localStorage.removeItem("userId");
    });
  };

  return (
    <>
      <Header />
      <ContentDiv>
        <AddPost />
        <ForumList />

        <LogoutWrapper>
          <LogoutBtn onClick={logOutUser}>Log out</LogoutBtn>
        </LogoutWrapper>
      </ContentDiv>
    </>
  );
};

const LogoutWrapper = styled.div`
  display: flex;
`;

const LogoutBtn = styled.button`
  width: fit-content;
  padding: 8px 24px;
  margin: 20px auto;
  cursor: pointer;
  font-size: 14px;
  font-weight: 700;
  display: inline-block;
  background: #fce3e4;
  border-radius: 50px;
  color: #0047ab;
  text-decoration: none;
  text-transform: uppercase;
  border: 1px solid #0047ab;
`;

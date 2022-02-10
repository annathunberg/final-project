import React, { useEffect } from "react";
import { useSelector, useDispatch, batch } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { AddPost } from "../components/AddPost";
import { ForumList } from "../components/ForumList";
import { Header } from "../components/Header";
import { user } from "../reducers/user";
import { forumPosts } from "../reducers/forumPosts";
import { getPosts } from "../utils/postsApiUtil";

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

const ContentDiv = styled.div`
  margin: 10px;
`;

const LogoutWrapper = styled.div`
  display: flex;
`;

const LogoutBtn = styled.button`
  width: fit-content;
  padding: 5px 10px;
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

import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { forumPosts } from "../reducers/forumPosts";
import styled from "styled-components";
import moment from "moment";
import { API_URL } from "../utils/Constants";
import { getPosts } from "../utils/postsApiUtil";

export const ForumList = () => {
  const items = useSelector((store) => store.forumPosts.items);
  const myUserId = useSelector((store) => store.user.userId);
  const dispatch = useDispatch();

  const onDeletePost = (id) => {
    const options = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id }),
    };

    fetch(API_URL("post/remove"), options)
      .then((res) => res.json())
      .then((data) => {
        getPosts(dispatch);
      });
  };
  const date = new Date();

  return (
    <>
      {items.map((item, index) => (
        <ContentDiv key={index}>
          <PostDiv>
            <PostTitle>{item.title}</PostTitle>
            <PostText>{item.message}</PostText>
            {myUserId === item.userId && (
              <DeleteBtn onClick={() => onDeletePost(item._id)}>
                Delete my post
              </DeleteBtn>
            )}
          </PostDiv>
          <DateStamp>
            <p>Posted: {moment(item.createdAt).fromNow()}</p>
          </DateStamp>
        </ContentDiv>
      ))}
    </>
  );
};

const ContentDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 10px auto;
  background-color: #fafafa;
  border-radius: 10px;
  width: 300px;
  height: fit-content;
`;

const PostDiv = styled.div`
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const DateStamp = styled.div`
  box-sizing: border-box;
  display: flex;
  font-family: Arial, Helvetica, sans-serif;
  font-style: italic;
  font-size: 10px;
  color: #f3bad6;
  height: fit-content;
  margin: auto;
`;

const PostTitle = styled.h2`
  word-wrap: break-word;
  text-align: left;
  font-family: Arial, Helvetica, sans-serif;
  color: hotpink;
  font-size: 22px;
  margin: 5px 15px;
  margin-top: 15px;
  @media (min-width: 700px) {
    font-size: 24px;
  }
`;

const PostText = styled.p`
  word-wrap: break-word;
  text-align: left;
  font-family: Arial, Helvetica, sans-serif;
  color: hotpink;
  font-size: 16px;
  margin: 5px 15px;
  @media (min-width: 700px) {
    font-size: 18px;
  }
`;

const DeleteBtn = styled.button`
  font-size: 16px;
  margin: 10px;
  color: hotpink;
  border: none;
  background-color: pink;
  cursor: pointer;
`;

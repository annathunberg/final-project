import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { forumPosts } from "../reducers/forumPosts";
import styled from "styled-components";
import moment from "moment";

export const ForumList = () => {
  const items = useSelector((store) => store.forumPosts.items);
  const dispatch = useDispatch();
  const onDeletePost = (id) => {
    dispatch(forumPosts.actions.deletePost(id));
  };
  const date = new Date();

  return (
    <>
      {items.map((item, index) => (
        <ContentDiv>
          <PostDiv key={item.id}>
            <PostText>{item.text}</PostText>
            <Button onClick={() => onDeletePost(item.id)}>Delete post</Button>
          </PostDiv>
          <DateStamp>
            <p>Posted: {moment(date.createdAt).fromNow()}</p>
          </DateStamp>
        </ContentDiv>
      ))}
    </>
  );
};

const ContentDiv = styled.div`
  margin: 10px auto;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const PostDiv = styled.div`
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
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

const PostText = styled.p`
  width: 100%;
  height: fit-content;
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

const Button = styled.button`
  font-size: 1.5em;
  margin: 10px;
  color: hotpink;
  border: none;
  background-color: transparent;
  cursor: pointer;
`;

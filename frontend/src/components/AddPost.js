import React from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { useState } from "react";
import { API_URL } from "../utils/Constants";
import { getPosts } from "../utils/postsApiUtil";

export const AddPost = () => {
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");

  const dispatch = useDispatch();
  const userId = useSelector((store) => store.user.userId);

  const onAddPost = async () => {
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ message, title, userId }),
    };

    fetch(API_URL("post/add"), options)
      .then((res) => res.json())
      .then((data) => {
        getPosts(dispatch);
      });
  };

  const resetInput = () => {
    setTitle("");
    setMessage("");
  };

  return (
    <StyledMainDiv>
      <TextInput
        placeholder="Title"
        type="text"
        value={title}
        onChange={(event) => setTitle(event.target.value)}
      />
      <TextInputArea
        type="textarea"
        rows="4"
        cols="70"
        value={message}
        onChange={(event) => setMessage(event.target.value)}
      />
      <AddBtn
        onClick={() => {
          onAddPost();
          resetInput();
        }}
      >
        Add Post
      </AddBtn>
    </StyledMainDiv>
  );
};

const StyledMainDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 50px auto;
  background-color: #fafafa;
  border-radius: 10px;
  width: 300px;
  height: auto;
`;

const TextInput = styled.input`
  margin: 10px auto;
  margin-top: 20px;
  color: hotpink;
  background-color: white;
  border: 1px solid hotpink;
  font-size: 16px;
  font-family: Arial, Helvetica, sans-serif;
  @media (min-width: 700px) {
    font-size: 22px;
  }
  border-radius: 6px;
  padding: 4px 8px;
`;

const TextInputArea = styled.textarea`
  margin: 10px auto;
  padding: 0 8px;
  min-width: 80%;
  max-width: 80%;
  border: 1px solid hotpink;
  caret-color: hotpink;
  color: hotpink;
  background-color: white;
  font-size: 16px;
  font-family: Arial, Helvetica, sans-serif;
  @media (min-width: 700px) {
    font-size: 22px;
  }
  border-radius: 6px;
`;

const AddBtn = styled.button`
  width: 100px;
  margin: 20px;
  cursor: pointer;
  font-weight: 700;
  display: inline-block;
  background: #fce3e4;
  padding: 5px 10px;
  border-radius: 50px;
  color: #0047ab;
  text-decoration: none;
  text-transform: uppercase;
  border: 1px solid #0047ab;
`;

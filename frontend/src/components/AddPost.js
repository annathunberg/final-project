import React from "react";
import { useDispatch } from "react-redux";
import { forumPosts } from "../reducers/forumPosts";
import styled from "styled-components";
import { useState } from "react";

export const AddPost = () => {
  const [input, setInput] = useState("");

  const dispatch = useDispatch();

  const onAddPost = () => {
    dispatch(forumPosts.actions.addPost(input));
  };

  const resetInput = () => {
    setInput("");
  };

  return (
    <StyledMainDiv>
      <TextInput
        type="text"
        value={input}
        onChange={(event) => setInput(event.target.value)}
      />
      <StyledButton
        onClick={() => {
          onAddPost();
          resetInput();
        }}
      />
    </StyledMainDiv>
  );
};

const StyledMainDiv = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: 70%;
  margin: 50px auto 50px;
  border: 0.5px dotted black;
`;

const TextInput = styled.input`
  margin: 50px auto;
  width: 50%;
  height: 50px;
  border: 1px solid hotpink;
  caret-color: hotpink;
  color: hotpink;
  background-color: white;
  font-size: 16px;
  font-family: Arial, Helvetica, sans-serif;
  @media (min-width: 700px) {
    font-size: 22px;
  }
`;

const StyledButton = styled.button`
  display: block;
  font-size: 20px;
  width: 50px;
  height: 30px;
  color: hotpink;
  border: 1px solid pink;
  background-color: transparent;
  cursor: pointer;
`;

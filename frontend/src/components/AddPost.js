import React from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { useState } from "react";
import { API_URL } from "../utils/Constants";
import { getPosts } from "../utils/postsApiUtil";

export const AddPost = () => {
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [isMissingFields, setIsMissingFields] = useState(false);

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
    setIsMissingFields(false);
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
      {isMissingFields && (
        <RequiredMessage>
          You need to set both the title and the message
        </RequiredMessage>
      )}
      <AddBtn
        onClick={() => {
          if (message === "" || title === "") {
            setIsMissingFields(true);
          } else {
            onAddPost();
            resetInput();
          }
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
  border-radius: 3px;
  width: 80%;
  height: auto;
  /* border: 1px solid #0047ab; */
  @media (min-width: 700px) {
    min-width: 60%;
    max-width: 70%;
  }
  @media (min-width: 1000px) {
    min-width: 40%;
    max-width: 40%;
  }
`;

const TextInput = styled.input`
  margin: 10px auto;
  margin-top: 20px;
  color: #0047ab;
  min-width: 80%;
  background-color: white;
  border: 1px solid #0047ab;
  caret-color: #0047ab;
  font-size: 16px;
  font-family: Arial, Helvetica, sans-serif;
  border-radius: 3px;
  padding: 4px 8px;
  @media (min-width: 700px) {
    font-size: 22px;
  }
`;

const TextInputArea = styled.textarea`
  margin: 10px auto;
  padding: 0 8px;
  min-width: 80%;
  max-width: 80%;
  border: 1px solid #0047ab;
  caret-color: #0047ab;
  color: #0047ab;
  background-color: white;
  font-size: 16px;
  font-family: Arial, Helvetica, sans-serif;
  border-radius: 3px;
  @media (min-width: 700px) {
    font-size: 22px;
  }
  @media (min-width: 1000px) {
    font-size: 22px;
  }
`;

const AddBtn = styled.button`
  width: 100px;
  margin: 20px auto;
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

const RequiredMessage = styled.p`
  font-weight: 700;
  font-size: 12px;
  margin: 10px 0;
  color: #0047ab;
  text-align: center;
  font-style: italic;
`;

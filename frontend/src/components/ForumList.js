import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { forumPosts } from "../reducers/forumPosts";
import styled from "styled-components";
import moment from "moment";
import { API_URL } from "../utils/Constants";
import { getPosts } from "../utils/postsApiUtil";

const onDeletePost = (dispatch, id) => {
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

export const ForumList = () => {
  const items = useSelector((store) => store.forumPosts.items);
  const myUserId = useSelector((store) => store.user.userId);
  const dispatch = useDispatch();
  const date = new Date();

  return (
    <>
      {items.map((post, index) => (
        <ContentDiv key={index}>
          <PostDiv>
            <PostWrapper>
              <DateStamp>
                <p>
                  Posted {moment(post.createdAt).fromNow()} by {post.posterName}
                </p>
              </DateStamp>
              <PostTitle>{post.title}</PostTitle>
              <PostText>{post.message}</PostText>
              {myUserId === post.userId && (
                <DeleteBtn onClick={() => onDeletePost(dispatch, post._id)}>
                  Delete
                </DeleteBtn>
              )}
            </PostWrapper>
            <CommentCountText>
              <strong>{post.comments.length} comments</strong>
            </CommentCountText>

            {post.comments.map((comment, index) => (
              <Comment key={`comment-${index}`}>
                <CommentText>
                  <strong>{comment.posterName} says:</strong>
                </CommentText>
                <CommentText>{comment.message}</CommentText>
              </Comment>
            ))}

            <AddCommentForm
              key={`addComment-${index}`}
              post={post}
              currentUserId={myUserId}
            />
          </PostDiv>
        </ContentDiv>
      ))}
    </>
  );
};

const addComment = (event, post, userId, message, dispatch) => {
  event.preventDefault();

  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      postId: post._id,
      message,
      userId,
    }),
  };

  fetch(API_URL("comment/add"), options)
    .then((res) => res.json())
    .then((data) => {
      getPosts(dispatch);
    });
};

export const AddCommentForm = (props) => {
  const [message, setMessage] = useState("");
  const dispatch = useDispatch();

  return (
    <CommentForm
      onSubmit={async (e) => {
        await addComment(e, props.post, props.currentUserId, message, dispatch);
        setMessage("");
      }}
    >
      <CommentInput
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        type="text"
        placeholder="Add new comment"
      />
      <SubmitBtn type="submit">Add comment</SubmitBtn>
    </CommentForm>
  );
};

const ContentDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 10px auto;
  background-color: #fafafa;
  border-radius: 2px;
  width: 80%;
  padding: 10px;
  height: auto;

  @media (min-width: 700px) {
    min-width: 60%;
    max-width: 70%;
  }
  @media (min-width: 1000px) {
    min-width: 40%;
    max-width: 40%;
  }
`;

const PostWrapper = styled.div`
  background: #fce3e4;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const PostDiv = styled.div`
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const DateStamp = styled.div`
  margin-top: 10px;
  box-sizing: border-box;
  display: flex;
  font-family: Arial, Helvetica, sans-serif;
  font-style: italic;
  font-size: 10px;
  color: #0047ab;
  height: fit-content;
  margin-bottom: 5px;
`;

const PostTitle = styled.h2`
  word-wrap: break-word;
  text-align: left;
  font-family: Arial, Helvetica, sans-serif;
  color: #0047ab;
  font-weight: 600;
  font-size: 14px;
  margin: 0;
  text-transform: uppercase;

  @media (min-width: 700px) {
    font-size: 14px;
  }
`;

const PostText = styled.p`
  word-wrap: break-word;
  text-align: left;
  font-family: Arial, Helvetica, sans-serif;
  color: #0047ab;
  font-size: 14px;
  margin-bottom: 15px;
  padding: 0 15px;
  max-width: 80%;
  @media (min-width: 700px) {
    font-size: 14px;
    max-width: 70%;
  }
`;

const DeleteBtn = styled.button`
  width: fit-content;
  cursor: pointer;
  font-weight: 700;
  display: inline-block;
  background: #fce3e4;
  font-size: 12px;
  padding: 5px 14px;
  border-radius: 50px;
  color: #0047ab;
  text-decoration: none;
  text-transform: uppercase;
  border: 1px solid #0047ab;
  margin-bottom: 15px;
`;

const CommentCountText = styled.p`
  width: 80%;
  text-align: center;
  color: #0047ab;
  font-size: 12px;
  padding: 12px 0;
  font-style: italic;
`;

const Comment = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 80%;
  font-size: 12px;
  color: #0047ab;
  margin: 2px;
  padding: 12px 0;
  border: 2px solid #fce3e4;
`;

const CommentText = styled.div`
  margin: 2px 0;
`;

const CommentForm = styled.form`
  display: flex;
  flex-direction: column;
  width: 80%;
  margin-top: 12px; ;
`;

const CommentInput = styled.input`
  display: flex;
  flex-direction: column;
  margin: auto;
  height: 25px;
  width: 90%;
  border-radius: 3px;
  border: 1px solid #d5dcf9;
  padding: 5px 10px;
`;

const SubmitBtn = styled.button`
  width: fit-content;
  margin-top: 10px;
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
  margin: 15px auto;
`;

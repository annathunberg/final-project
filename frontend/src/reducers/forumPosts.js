import { createSlice } from "@reduxjs/toolkit";

import { ui } from "./ui";
import { API_URL } from "../utils/Constants";

export const forumPosts = createSlice({
  name: "forumPosts",
  initialState: {
    items: [],
    error: null,
  },
  reducers: {
    setItems: (store, action) => {
      store.items = action.payload;
    },
    setError: (store, action) => {
      store.error = action.payload;
    },

    deletePost: (store, action) => {
      store.items = store.items.filter((item) => item._id !== action.payload);
    },
    togglePost: (store, action) => {
      const post = store.items.find((item) => item._id === action.payload);
      post.isAnswered = !post.isAnswered;
    },
  },
});

export const showPosts = (accessToken, userId) => {
  return (dispatch) => {
    dispatch(ui.actions.setLoading(true));
    const options = {
      method: "GET",
      headers: {
        Authorization: accessToken,
      },
    };
    fetch(API_URL(`posts/${userId}`), options)
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          dispatch(forumPosts.actions.setItems(data.response));
          dispatch(forumPosts.actions.setError(null));
        } else {
          dispatch(forumPosts.actions.setError(data.response));
        }
      })
      .finally(setTimeout(() => dispatch(ui.actions.setLoading(false)), 400));
  };
};

const showPostsStopLoading = (accessToken, userId) => {
  return (dispatch) => {
    const options = {
      method: "GET",
      headers: {
        Authorization: accessToken,
      },
    };
    fetch(API_URL(`posts/${userId}`), options)
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          dispatch(forumPosts.actions.setItems(data.response));
          dispatch(forumPosts.actions.setError(null));
        } else {
          dispatch(forumPosts.actions.setError(data.response));
        }
      })
      .finally(setTimeout(() => dispatch(ui.actions.setLoading(false)), 400));
  };
};

export const onDeletePost = (accessToken, postId) => {
  return (dispatch) => {
    const options = {
      method: "DELETE",
      headers: {
        Authorization: accessToken,
      },
    };
    fetch(API_URL(`posts/${postId}`), options)
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          dispatch(forumPosts.actions.deletePost(postId));
          dispatch(forumPosts.actions.setError(null));
        } else {
          dispatch(forumPosts.actions.setItems([]));
          dispatch(forumPosts.actions.setError(data.response));
        }
      });
  };
};

export const onTogglePost = (accessToken, postId, isAnswered) => {
  return (dispatch) => {
    const options = {
      method: "PATCH",
      body: JSON.stringify({ isAnswered: !isAnswered ? true : false }),
      headers: {
        Authorization: accessToken,
        "Content-Type": "application/json",
      },
    };
    fetch(API_URL(`posts/${postId}/isAnswered`), options)
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          dispatch(forumPosts.actions.togglePost(postId));
          dispatch(forumPosts.actions.setError(null));
        } else {
          dispatch(forumPosts.actions.setError(data.response));
        }
      });
  };
};

export const onAddPost = (
  accessToken,
  postInput,

  categoryInput,
  userId
) => {
  return (dispatch) => {
    dispatch(ui.actions.setLoading(true));
    const options = {
      method: "POST",
      body: JSON.stringify({
        postName: postInput,

        categoryId: categoryInput,
        userId: userId,
      }),
      headers: {
        Authorization: accessToken,
        "Content-Type": "application/json",
      },
    };
    fetch(API_URL("posts"), options)
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          dispatch(forumPosts.actions.setError(null));
        } else {
          dispatch(forumPosts.actions.setError(data.response));
        }
      })
      .finally(() => dispatch(showPostsStopLoading(accessToken, userId)));
  };
};

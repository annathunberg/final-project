import { createSlice } from "@reduxjs/toolkit";

export const forumPosts = createSlice({
  name: "forumPosts",
  initialState: {
    items: [],
  },
  reducers: {
    setPosts: (store, action) => {
      store.items = [...action.payload];
    },
    deletePost: (store, action) => {
      const decreasedItems = store.items.filter(
        (item) => item.id !== action.payload
      );
      store.items = decreasedItems;
    },
  },
});

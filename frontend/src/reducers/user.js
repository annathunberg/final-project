import { createSlice } from "@reduxjs/toolkit";

export const user = createSlice({
  name: "user",
  initialState: {
    userId: null,
    username: null,
    accessToken: null,
    error: null,
  },
  reducers: {
    setUserId: (store, action) => {
      store.userId = action.payload;
      if (store.userId !== null) {
        localStorage.setItem("userId", store.userId);
      }
    },
    setUsername: (store, action) => {
      store.username = action.payload;
    },
    setAccessToken: (store, action) => {
      store.accessToken = action.payload;
      if (store.accessToken !== null) {
        localStorage.setItem("accessToken", store.accessToken);
      }
    },
    setError: (store, action) => {
      store.error = action.payload;
    },
  },
});

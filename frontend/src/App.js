import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import { configureStore, combineReducers } from "@reduxjs/toolkit";

import { MainPage } from "./pages/MainPage";
import { LoginPage } from "./pages/LoginPage";
import { ForumPage } from "./pages/ForumPage";
import { NotFoundPage } from "./pages/NotFoundPage";

import { user } from "./reducers/user";
import { forumPosts } from "./reducers/forumPosts";
import { ui } from "./reducers/ui";
import { categories } from "./reducers/categories";

const reducer = combineReducers({
  user: user.reducer,
  ui: ui.reducer,
  forumPosts: forumPosts.reducer,
  categories: categories.reducer,
});

const store = configureStore({ reducer });

export const App = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/forum" element={<ForumPage />} />
          <Route path="*" element={<NotFoundPage />} />
          {/* /forum/1 => Post #1 */}
        </Routes>
      </BrowserRouter>
    </Provider>
  );
};

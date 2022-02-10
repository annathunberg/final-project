import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import { configureStore, combineReducers } from "@reduxjs/toolkit";

import { LoginStateLoader } from "./components/LoginStateLoader";

import { ResourcesPage } from "./pages/ResourcesPage";
import { LoginPage } from "./pages/LoginPage";
import { ForumPage } from "./pages/ForumPage";
import { NotFoundPage } from "./pages/NotFoundPage";

import { user } from "./reducers/user";
import { forumPosts } from "./reducers/forumPosts";

const reducer = combineReducers({
  user: user.reducer,
  // ui: ui.reducer,
  forumPosts: forumPosts.reducer,
  //categories: categories.reducer,
});

const store = configureStore({ reducer });

export const App = () => {
  return (
    <Provider store={store}>
      <LoginStateLoader />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<ResourcesPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/forum" element={<ForumPage />} />
          <Route path="*" element={<NotFoundPage />} />
          {/* /forum/1 => Post #1 */}
        </Routes>
      </BrowserRouter>
    </Provider>
  );
};

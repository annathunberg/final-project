import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { Main } from "./components/Main";
import { Login } from "./components/Login";
import { Forum } from "./components/Forum";
import { NotFound } from "./components/NotFound";

export const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forum" element={<Forum />} />
        <Route path="*" element={<NotFound />} />
        {/* /forum/1 => Post #1 */}
      </Routes>
    </BrowserRouter>
  );
};

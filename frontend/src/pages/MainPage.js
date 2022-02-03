import React, { useEffect } from "react";
import { BrowserRouter, useNavigate } from "react-router-dom";

export const MainPage = () => {
  const navigate = useNavigate();
  useEffect(() => navigate("/forum"));
  return <div></div>;
};

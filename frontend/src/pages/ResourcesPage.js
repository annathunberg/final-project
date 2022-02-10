import React, { useEffect } from "react";
import { BrowserRouter, useNavigate } from "react-router-dom";

export const ResourcesPage = () => {
  const navigate = useNavigate();
  useEffect(() => navigate("/forum")); //ska vi ha detta?
  return (
    <div>
      <h1>Resources</h1>
      <p>Information for family and friends</p>
      <p>Support options</p>
      <p>CBT exercises</p>
    </div>
  );
};

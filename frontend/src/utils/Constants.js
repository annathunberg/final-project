const BASE_URL =
  process.env.NODE_ENV === "production"
    ? "https://mental-health-club.herokuapp.com"
    : "http://localhost:8080";

export const API_URL = (slug) => `${BASE_URL}/${slug}`;

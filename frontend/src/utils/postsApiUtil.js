import { API_URL } from "../utils/Constants";
import { forumPosts } from "../reducers/forumPosts";

export function getPosts(dispatch) {
  const options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  };

  fetch(API_URL("posts"), options)
    .then((res) => res.json())
    .then((data) => {
      dispatch(forumPosts.actions.setPosts(data.response.posts));
    });
}

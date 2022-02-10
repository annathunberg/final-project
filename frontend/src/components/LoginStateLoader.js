import { user } from "../reducers/user";
import { useDispatch } from "react-redux";

export const LoginStateLoader = () => {
  const dispatch = useDispatch();

  const accessToken = localStorage.getItem("accessToken");
  const userId = localStorage.getItem("userId");
  dispatch(user.actions.setAccessToken(accessToken));
  dispatch(user.actions.setUserId(userId));
  return <span></span>;
};

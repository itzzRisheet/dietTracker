import { Navigate } from "react-router-dom";
import { useAuthStore, useLocalStorage } from "../store/store";

export const AuthorizeUser = ({ children }) => {
  const { token } = useLocalStorage((state) => state.tokenData);
  if (!token) return <Navigate to={"/"} replace={true}></Navigate>;

  return children;
};

export const ProtectRoute = ({ children }) => {
  const username = useAuthStore.getState().auth.username;

  if (!username) return <Navigate to={"/"} replace={true}></Navigate>;

  return children;
};

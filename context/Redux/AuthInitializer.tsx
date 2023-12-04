// AuthInitializer.tsx

import React, { ReactNode, useEffect } from "react";
import { useDispatch } from "react-redux";

import { useSelector } from "react-redux";
import { RootState } from "./store/store";
import { setToken, setUser } from "./slices/authSlice";
import { User } from "./types";

interface AuthInitializerProps {
  children: ReactNode;
}

const AuthInitializer: React.FC<AuthInitializerProps> = ({ children }) => {
  const dispatch = useDispatch();
  // const userFromLocalStorage = useSelector(
  //   (state: RootState) => state.auth.user
  // );

  useEffect(() => {
    if (typeof window !== "undefined") {
      const userFromLocalStorage = localStorage.getItem("userdata");
      const tokenFromLocalStorage = localStorage.getItem("access_token_");

      if (userFromLocalStorage) {
        dispatch(setUser(JSON.parse(userFromLocalStorage) as User));
      }

      if (tokenFromLocalStorage) {
        dispatch(setToken(tokenFromLocalStorage));
      }
    }
  }, [dispatch]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const userFromLocalStorage = localStorage.getItem("user");
      const tokenFromLocalStorage = localStorage.getItem("access_token");

      if (userFromLocalStorage) {
        dispatch(setUser(JSON.parse(userFromLocalStorage) as User));
      }

      if (tokenFromLocalStorage) {
        dispatch(setToken(tokenFromLocalStorage));
      }
    }
  }, [dispatch]);

  return children;
};

export default AuthInitializer;

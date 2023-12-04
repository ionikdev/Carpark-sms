// authSlice.ts
"use client";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "../types";

interface AuthState {
  user: User | null;
  token: string | null;
}

const initialState: AuthState = {
  user: null,
  token: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User | null>) => {
      state.user = action.payload;
      if (action.payload) {
        localStorage.setItem("userdata", JSON.stringify(action.payload));
      } else {
        localStorage.removeItem("access_token_");
      }
    },
    setToken: (state, action: PayloadAction<string | null>) => {
      state.token = action.payload;
      if (action.payload) {
        localStorage.setItem("access_token_", action.payload);
      } else {
        localStorage.removeItem("access_token_");
      }
    },
  },
});

export const { setUser, setToken } = authSlice.actions;

export default authSlice.reducer;

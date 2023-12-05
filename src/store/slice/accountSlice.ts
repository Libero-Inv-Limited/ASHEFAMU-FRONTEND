/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice } from "@reduxjs/toolkit";

type InitialStateType = {
  user: UserData | null;
  tokenStore: TokenData | null;
  isAuthenticated: boolean;
};
const initialState: InitialStateType = {
  user: null,
  tokenStore: null,
  isAuthenticated: false,
};

const accountSlice = createSlice({
  name: "account",
  initialState,
  reducers: {
    clearAccount: (state) => {
      state.tokenStore = null;
      state.user = null;
      state.isAuthenticated = false;
    },
    populateUser: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = true;
    },
    populateToken: (state, action) => {
      state.tokenStore = action.payload;
    },
  },
});

export const { populateUser, populateToken, clearAccount } =
  accountSlice.actions;
export default accountSlice.reducer;

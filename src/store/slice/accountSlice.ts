/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice } from '@reduxjs/toolkit';


type InitialStateType = {
  user: UserData | null,
  tokenStore: TokenData | null
}
const initialState:InitialStateType = {
  user: null,
  tokenStore: null
};


const accountSlice = createSlice({
  name: 'account',
  initialState,
  reducers:{
    clearAccount: (state) => {
      state.tokenStore = null
      state.user = null
    },
    populateUser: (state, action) => {
      state.user = action.payload
    },
    populateToken: (state, action) => {
      state.tokenStore = action.payload
    }
  }
})


export const { populateUser, populateToken, clearAccount } = accountSlice.actions;
export default accountSlice.reducer;
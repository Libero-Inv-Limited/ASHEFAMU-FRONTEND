/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice } from '@reduxjs/toolkit';


type InitialStateType = {
  user: UserData | null,
  tokenStore?: TokenData
}
const initialState:InitialStateType = {
  user: null,
  tokenStore: undefined
};


const accountSlice = createSlice({
  name: 'account',
  initialState,
  reducers:{
    populateUser: (state, action) => {
      state.user = action.payload
    },
    populateToken: (state, action) => {
      state.tokenStore = action.payload
    }
  }
})


export const { populateUser, populateToken } = accountSlice.actions;
export default accountSlice.reducer;
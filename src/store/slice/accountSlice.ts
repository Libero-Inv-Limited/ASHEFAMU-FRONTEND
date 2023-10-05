/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice } from '@reduxjs/toolkit';


type InitialStateType = {
  user: any
}
const initialState:InitialStateType = {
  user: null
};


const accountSlice = createSlice({
  name: 'account',
  initialState,
  reducers:{
    populateUser: (state, action) => {
      state.user = action.payload
    }
  }
})


export const { populateUser } = accountSlice.actions;
export default accountSlice.reducer;
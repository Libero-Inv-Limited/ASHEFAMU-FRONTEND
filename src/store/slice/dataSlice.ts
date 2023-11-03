import { createSlice } from '@reduxjs/toolkit';


type InitialStateType = {
  facilities: FacilityData[]
  users: UserData[]
}
const initialState:InitialStateType = {
  facilities: [], 
  users: []
};


const dataSlice = createSlice({
  name: 'data',
  initialState,
  reducers:{
    populateFacilities: (state, action) => {
      state.facilities = action.payload
    },
    populateUsers: (state, action) => {
      state.users = action.payload
    }
  }
})


export const { populateFacilities, populateUsers } = dataSlice.actions;
export default dataSlice.reducer;
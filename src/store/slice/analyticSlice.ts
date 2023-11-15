import { createSlice } from '@reduxjs/toolkit';


type InitialStateType = {
  facilitiesRegStats: FacilitiesRegStats,
}
const initialState:InitialStateType = {
  facilitiesRegStats: {labels: [], values: []},
};


const dataSlice = createSlice({
  name: 'data',
  initialState,
  reducers:{
    populateFacilitiesRegStats: (state, action) => {
      state.facilitiesRegStats = action.payload
    },
  }
})


export const { populateFacilitiesRegStats, } = dataSlice.actions;
export default dataSlice.reducer;
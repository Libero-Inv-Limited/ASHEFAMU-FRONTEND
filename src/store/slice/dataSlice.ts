import { createSlice } from '@reduxjs/toolkit';


type InitialStateType = {
  facilities: FacilityData[]
}
const initialState:InitialStateType = {
  facilities: []
};


const dataSlice = createSlice({
  name: 'data',
  initialState,
  reducers:{
    populateFacilities: (state, action) => {
      state.facilities = action.payload
    }
  }
})


export const { populateFacilities } = dataSlice.actions;
export default dataSlice.reducer;
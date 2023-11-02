import { createSlice } from '@reduxjs/toolkit';


type InitialStateType = {
  facilities: FacilityData[],
  dashboardCards: DashboardCardType[],
}
const initialState:InitialStateType = {
  facilities: [],
  dashboardCards: [],
};


const dataSlice = createSlice({
  name: 'data',
  initialState,
  reducers:{
    populateFacilities: (state, action) => {
      state.facilities = action.payload
    },
    populateDashboardCards: (state, action) => {
      const data = action.payload as DashboardCardType[]
      state.dashboardCards = data.sort((a, b) => a.position - b.position)
    },
  }
})


export const { populateFacilities, populateDashboardCards } = dataSlice.actions;
export default dataSlice.reducer;
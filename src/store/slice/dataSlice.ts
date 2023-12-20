import { createSlice } from '@reduxjs/toolkit';


type InitialStateType = {
  facilities: FacilityData[],
  dashboardCards: DashboardCardType[],
  fees: FeeDataType[],
  permissionCategories: string[]
}
const initialState:InitialStateType = {
  facilities: [],
  dashboardCards: [],
  fees: [],
  permissionCategories: []
};


const dataSlice = createSlice({
  name: 'data',
  initialState,
  reducers:{
    populateFacilities: (state, action) => {
      state.facilities = action.payload
    },
    populateFees: (state, action) => {
      state.fees = action.payload
    },
    populateCategories: (state, action) => {
      state.permissionCategories = action.payload
    },
    populateDashboardCards: (state, action) => {
      const data = action.payload as DashboardCardType[]
      state.dashboardCards = data.sort((a, b) => a.position - b.position)
    },
  }
})


export const { populateFacilities, populateDashboardCards, populateFees, populateCategories } = dataSlice.actions;
export default dataSlice.reducer;
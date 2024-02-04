import { createSlice } from '@reduxjs/toolkit';


type InitialStateType = {
  facilities: FacilityData[],
  dashboardCards: DashboardCardType[],
  fees: FeeDataType[],
  permissionCategories: string[],
  facilityAddons: AddonDataType[]
}
const initialState:InitialStateType = {
  facilities: [],
  dashboardCards: [],
  fees: [],
  permissionCategories: [],
  facilityAddons: []
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
    populateFacilityAddons: (state, action)=> {
      state.facilityAddons = action.payload
    }
  }
})


export const { populateFacilities, populateDashboardCards, populateFees, populateCategories, populateFacilityAddons } = dataSlice.actions;
export default dataSlice.reducer;
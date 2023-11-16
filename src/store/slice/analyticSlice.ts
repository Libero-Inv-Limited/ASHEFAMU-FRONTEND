import { createSlice } from '@reduxjs/toolkit';


type InitialStateType = {
  facilitiesRegStats: FacilitiesRegStats,
  statsMetrics: metricsStats | null
}
const initialState:InitialStateType = {
  facilitiesRegStats: {labels: [], values: []},
  statsMetrics: null
};


const dataSlice = createSlice({
  name: 'data',
  initialState,
  reducers:{
    populateFacilitiesRegStats: (state, action) => {
      state.facilitiesRegStats = action.payload
    },
    populateMetricStats: (state, action) => {
      state.statsMetrics = action.payload
    },
  }
})


export const { populateFacilitiesRegStats, populateMetricStats} = dataSlice.actions;
export default dataSlice.reducer;
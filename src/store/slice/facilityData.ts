import { createSlice } from '@reduxjs/toolkit';


type InitialStateType = {
  requiredDocs: RequireDocumentType[],
  sectorCategory: SectorCategoryType[],

}
const initialState: InitialStateType = {
  requiredDocs: [],
  sectorCategory: []
};


const facilityData = createSlice({
  name: 'facilityData',
  initialState,
  reducers:{
    populateRequiredDocs: (state, action) => {
      state.requiredDocs = action.payload
    },
    populateSectorCategory: (state, action) => {
      state.sectorCategory = action.payload
    },
  }
})


export const { populateRequiredDocs, populateSectorCategory } = facilityData.actions;
export default facilityData.reducer;
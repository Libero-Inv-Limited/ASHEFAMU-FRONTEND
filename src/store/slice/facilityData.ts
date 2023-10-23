import { createSlice } from '@reduxjs/toolkit';


type InitialStateType = {
  requiredDocs: RequireDocumentType[],
  sectorCategory: SectorCategoryType[],
  facilityCategory: FacilityCategoryType[],
  serviceScope: SectorCategoryType[],
  wasteDisposalMethods: WasteDisposalType[],
  protectiveItems: ProctectiveItemType[],
  nonComplimentList: NonComplimentListType[],
}
const initialState: InitialStateType = {
  requiredDocs: [],
  sectorCategory: [],
  facilityCategory: [],
  serviceScope: [],
  wasteDisposalMethods: [],
  protectiveItems: [],
  nonComplimentList: []
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
    populateFacilityCategory: (state, action) => {
      state.facilityCategory = action.payload
    },
    populateServiceScope: (state, action) => {
      state.serviceScope = action.payload
    },
    populateWasteDisposalMethod: (state, action) => {
      state.wasteDisposalMethods = action.payload
    },
    populateProtectiveItems: (state, action) => {
      state.protectiveItems = action.payload
    },
    populateNonCompliment: (state, action) => {
      state.nonComplimentList = action.payload
    },
  }
})


export const { populateRequiredDocs, populateSectorCategory, populateFacilityCategory, populateServiceScope, populateProtectiveItems, populateWasteDisposalMethod, populateNonCompliment } = facilityData.actions;
export default facilityData.reducer;
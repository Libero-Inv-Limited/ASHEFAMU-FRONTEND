/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice } from '@reduxjs/toolkit';
import ROUTES from '../../utils/routeNames';


export const FORM_STEPS = {
  BEGIN:ROUTES.CREATE_FACILITY_ROUTE,
  INTENT:ROUTES.CREATE_INTENT_ROUTE,
  FILL_FORM:ROUTES.FILL_FORM_ROUTE,
  SERVICES: 1,
  DOCUMENT: 2,
  STAFFS: 3,
}

export enum STEPS {
  BEGIN="BEGIN",
  INTENT="INTENT",
  FILL_FORM="FILL_FORM",
  SERVICES="SERVICES",
  DOCUMENT="DOCUMENT",
  STAFFS="STAFFS",
}

type InitialStateType = {
  currentStep: keyof typeof FORM_STEPS,
  data: any,
  savedFacility: FacilityData | null,
}
const initialState:InitialStateType  = {
  currentStep: "BEGIN",
  data: {},
  savedFacility: null
};

const createFacility = createSlice({
  name: 'create',
  initialState,
  reducers:{
    updateLevel: (state, action) => {
      state.currentStep = action.payload.step
      state.data = {...state.data, ...action.payload.data}
    },
    clearLevelState: (state) => {
      state.currentStep = "BEGIN",
      state.data = {}
    },
    updateSavedFacility: (state, action) => {
      const prev = state.savedFacility
      state.savedFacility = prev ? { ...prev, ...action.payload } : action.payload
    }
  }
})


export const { clearLevelState, updateLevel, updateSavedFacility } = createFacility.actions;
export default createFacility.reducer;
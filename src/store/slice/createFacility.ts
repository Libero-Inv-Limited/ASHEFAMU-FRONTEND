/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice } from '@reduxjs/toolkit';
import ROUTES from '../../utils/routeNames';


export const FORM_STEPS = {
  BEGIN:ROUTES.CREATE_FACILITY_ROUTE,
  INTENT:ROUTES.CREATE_INTENT_ROUTE,
  FILL_FORM:ROUTES.FILL_FORM_ROUTE,
}

type InitialStateType = {
  currentStep: keyof typeof FORM_STEPS,
  data: any
}
const initialState:InitialStateType  = {
  currentStep: "BEGIN",
  data: {}
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
    }
  }
})


export const { clearLevelState, updateLevel } = createFacility.actions;
export default createFacility.reducer;
/// <reference types="redux-persist/types" />

import {
  Action,
  ThunkAction,
  combineReducers,
  configureStore,
} from "@reduxjs/toolkit";

import storage from "redux-persist/lib/storage";
import persistReducer from "redux-persist/es/persistReducer";
import persistStore from "redux-persist/es/persistStore";

import createFacilityReducer from "./slice/createFacility";
import accountReducer from "./slice/accountSlice";
import facilityDataReducer from "./slice/facilityData";
import dataReducer from "./slice/dataSlice";

import statsReducer from "./slice/analyticSlice";

const appReducer = combineReducers({
  accountStore: accountReducer,
  createFacilityStore: createFacilityReducer,
  facilityDataStore: facilityDataReducer,
  dataStore: dataReducer,
  statsStore: statsReducer,
});

const persistedReducer = persistReducer(
  {
    key: "root",
    storage,
    whitelist: ["accountStore", "createFacilityStore", "dataStore"],
  },
  appReducer
);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});

export const persistor = persistStore(store);
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

export default store;

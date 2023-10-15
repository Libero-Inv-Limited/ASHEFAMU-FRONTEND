/// <reference types="redux-persist/types" /> 

import { Action, ThunkAction, combineReducers, configureStore } from "@reduxjs/toolkit";

import storage from "redux-persist/lib/storage";
import persistReducer from "redux-persist/es/persistReducer";
import persistStore from "redux-persist/es/persistStore";

import createFacilityReducer from "./slice/createFacility";
import accountReducer from "./slice/accountSlice"

const persistConfig = { key: "root", storage };
const appReducer = combineReducers({
  accountStore: accountReducer,
  createFacilityStore: createFacilityReducer,
});
const persistedReducer = persistReducer(persistConfig, appReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false }),
});

export const persistor = persistStore(store);
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;

export default store;
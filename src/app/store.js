import { configureStore } from "@reduxjs/toolkit";
import apiSlice from "../features/api/apiSlice";
import authSlice from "../features/auth/authSlice";
import filterSlice from "../features/filter/filterSlice";
import jobPersistConfig from "../features/job/jobPersistConfig";
import jobSlice from "../features/job/jobSlice";
import { persistReducer } from "redux-persist";

let production = false;

if (process.env.NODE_ENV === "development") {
  production = false;
} else {
  production = true;
}

const persistedJobReducer = persistReducer(jobPersistConfig, jobSlice);

const store = configureStore({
  devTools: !production,
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    auth: authSlice,
    filter: filterSlice,
    job: persistedJobReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});

export default store;

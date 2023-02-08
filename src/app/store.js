import { configureStore } from "@reduxjs/toolkit";
import apiSlice from "../features/api/apiSlice";
import authSlice from "../features/auth/authSlice";
import filterSlice from "../features/filter/filterSlice";
import jobSlice from "../features/job/jobSlice";

let production = false;

if (process.env.NODE_ENV === "development") {
  production = false;
} else {
  production = true;
}

const store = configureStore({
  devTools: !production,
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    auth: authSlice,
    filter: filterSlice,
    job: jobSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});

export default store;

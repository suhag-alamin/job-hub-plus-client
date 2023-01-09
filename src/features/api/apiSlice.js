import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

let URL;

if (process.env.NODE_ENV === "development") {
  URL = "http://localhost:5000";
} else {
  // URL = "https://job-hub-plus.onrender.com";
  URL = "https://job-hub-plus-api.vercel.app";
}

const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: URL,
  }),
  endpoints: (builder) => ({}),
});

export default apiSlice;

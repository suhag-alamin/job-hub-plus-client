import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

let URL;

if (process.env.NODE_ENV === "development") {
  URL = "http://localhost:5000";
} else {
  URL = "https://job-hub-plus.onrender.com";
}

const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: URL,
  }),
  endpoints: (builder) => ({}),
  tagTypes: ["Jobs", "AppliedJobs"],
});

export default apiSlice;

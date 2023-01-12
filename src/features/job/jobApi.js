import apiSlice from "../api/apiSlice";

const jobApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    postJob: builder.mutation({
      query: (data) => ({
        url: "/job",
        method: "POST",
        body: data,
      }),
    }),
    getJobs: builder.query({
      query: () => "/jobs",
    }),
    getJobById: builder.query({
      query: (id) => `/job/${id}`,
    }),
  }),
});

export const { usePostJobMutation, useGetJobsQuery, useGetJobByIdQuery } =
  jobApi;

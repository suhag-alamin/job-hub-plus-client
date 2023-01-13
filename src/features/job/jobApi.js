import apiSlice from "../api/apiSlice";

const jobApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    postJob: builder.mutation({
      query: (data) => ({
        url: "/job",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Jobs"],
    }),
    getJobs: builder.query({
      query: () => "/jobs",
      providesTags: ["Jobs"],
    }),
    getJobById: builder.query({
      query: (id) => `/job/${id}`,
    }),
  }),
});

export const { usePostJobMutation, useGetJobsQuery, useGetJobByIdQuery } =
  jobApi;

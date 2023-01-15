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
    applyJob: builder.mutation({
      query: (data) => ({
        url: "/apply",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["AppliedJobs"],
    }),
    getAppliedJobsByEmail: builder.query({
      query: (email) => `/applied-jobs/${email}`,
      providesTags: ["AppliedJobs"],
    }),
  }),
});

export const {
  usePostJobMutation,
  useGetJobsQuery,
  useGetJobByIdQuery,
  useApplyJobMutation,
  useGetAppliedJobsByEmailQuery,
} = jobApi;

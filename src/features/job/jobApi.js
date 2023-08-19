import apiSlice from "../api/apiSlice";

const jobApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // post job
    postJob: builder.mutation({
      query: (data) => ({
        url: "/job",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Jobs"],
    }),
    // get jobs
    getJobs: builder.query({
      query: () => "/jobs",
      providesTags: ["Jobs"],
    }),
    // get job by id
    getJobById: builder.query({
      query: (id) => `/job/${id}`,
    }),
    // delete job by id
    deleteJobById: builder.mutation({
      query: (id) => ({
        url: `/job/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Jobs"],
    }),

    // apply job
    applyJob: builder.mutation({
      query: (data) => ({
        url: "/apply",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["AppliedJobs"],
    }),
    // get applied jobs by email
    getAppliedJobsByEmail: builder.query({
      query: (email) => `/applied-jobs/${email}`,
      providesTags: ["AppliedJobs"],
    }),
    // get posted jobs by email
    getPostedJobsByEmail: builder.query({
      query: (email) => `/posted-jobs/${email}`,
      providesTags: ["Jobs"],
    }),
    // cancel applied job
    cancelAppliedJob: builder.mutation({
      query: (id) => ({
        url: `/cancel-applied-job/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["AppliedJobs"],
    }),

    // get applicants
    getApplicantsByJobUserIds: builder.mutation({
      query: (data) => ({
        url: "/applicants",
        method: "POST",
        body: data,
      }),
    }),

    // search jobs
    searchJobs: builder.mutation({
      query: (searchTerm) => ({
        url: `/search-jobs?searchTerm=${searchTerm}`,
        method: "POST",
      }),
    }),
  }),
});

export const {
  usePostJobMutation,
  useGetJobsQuery,
  useGetJobByIdQuery,
  useDeleteJobByIdMutation,
  useApplyJobMutation,
  useGetAppliedJobsByEmailQuery,
  useCancelAppliedJobMutation,
  useGetPostedJobsByEmailQuery,
  useGetApplicantsByJobUserIdsMutation,
  useSearchJobsMutation,
} = jobApi;

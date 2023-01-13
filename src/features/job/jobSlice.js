import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  savedJobs: [],
};

const jobSlice = createSlice({
  name: "job",
  initialState,

  reducers: {
    addToSaveJob: (state, action) => {
      const savedJob = state.savedJobs.find(
        (job) => job._id === action.payload._id
      );
      if (savedJob) return;

      state.savedJobs.push(action.payload);
    },
  },
});

export const { addToSaveJob } = jobSlice.actions;

export default jobSlice.reducer;

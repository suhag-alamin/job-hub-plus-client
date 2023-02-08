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
    removeFromSaveJob: (state, action) => {
      state.savedJobs = state.savedJobs.filter(
        (job) => job._id !== action.payload
      );
    },
  },
});

export const { addToSaveJob, removeFromSaveJob } = jobSlice.actions;

export default jobSlice.reducer;

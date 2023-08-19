import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  savedJobs: [],
  searchJobs: [],
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

    setSearchJobs: (state, action) => {
      state.searchJobs = action.payload;
    },

    removeSearchJobs: (state) => {
      state.searchJobs = [];
    },
  },
});

export const {
  addToSaveJob,
  removeFromSaveJob,
  setSearchJobs,
  removeSearchJobs,
} = jobSlice.actions;

export default jobSlice.reducer;

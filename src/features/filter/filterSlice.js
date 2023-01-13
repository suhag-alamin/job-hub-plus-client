import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  employmentType: "all",
  postedTime: "any-time",
  salaryRange: [500, 3000],
  remote: false,
};

const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    toggleRemote: (state) => {
      state.remote = !state.remote;
    },
    setJobTypes: (state, action) => {
      state.employmentType = action.payload;
    },
    togglePostedTime: (state, action) => {
      state.postedTime = action.payload;
    },
    setSalaryRange: (state, action) => {
      state.salaryRange = action.payload;
    },
  },
});

export const { toggleRemote, setJobTypes, togglePostedTime, setSalaryRange } =
  filterSlice.actions;

export default filterSlice.reducer;

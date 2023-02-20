import { createSlice } from "@reduxjs/toolkit";

export const initialDel: boolean = false;

export const delSlice = createSlice({
  name: "delSlice",
  initialState: initialDel,
  reducers: {
    toggleDelete: (state) => {
      return !state;
    },
  },
});

export const delActions = delSlice.actions;
export default delSlice;

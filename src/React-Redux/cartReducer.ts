import { createSlice } from "@reduxjs/toolkit";

export const initialCart: itemType[] = [];

const cartSlice = createSlice({
  name: "cart",
  initialState: initialCart,
  reducers: {
    initializeCart: (state, action) => {
      return [...action.payload];
    },
    addToCart: (state, action) => {
      return [...state, action.payload];
    },
    deleteFromCart: (state, action) => {
      return state.filter((item) => item.id !== action.payload);
    },
    incrementCount: (state, action) => {
      state[state.findIndex((item) => item.id === action.payload)].count! += 1;
    },
    decrementCount: (state, action) => {
      state[state.findIndex((item) => item.id === action.payload)].count! -= 1;
    },
  },
});

export const cartActions = cartSlice.actions;

export default cartSlice;

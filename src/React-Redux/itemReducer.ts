import { createSlice } from "@reduxjs/toolkit";

export const initialItems: itemType[] = [];

const itemSlice = createSlice({
  name: "itemSlice",
  initialState: initialItems,
  reducers: {
    initializeItems: (state, action) => {
      return [...action.payload];
    },
    addToItems: (state, action) => {
      return [...state, action.payload];
    },
    deleteFromItems: (state, action) => {
      return state.filter((item) => item.id !== action.payload);
    },
    toggleWishlist: (state, action) => {
      state[state.findIndex((item) => item.id === action.payload)].wishlisted =
        !state[state.findIndex((item) => item.id === action.payload)]
          .wishlisted;
    },
  },
});

export const itemActions = itemSlice.actions;

export default itemSlice;

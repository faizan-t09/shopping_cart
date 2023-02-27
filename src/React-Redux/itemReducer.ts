import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

export const initialItems: itemType[] = [];

export const fetchItems = createAsyncThunk("itemSlice/fetchItems", () => {
  return fetch(`${process.env.REACT_APP_MY_API_BASE_URL}/product/getAll`)
    .then((response) => response.json())
    .catch((error) => {
      toast.error("Failed to fetch items");
    });
});

const itemSlice = createSlice({
  name: "itemSlice",
  initialState: initialItems,
  reducers: {
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
  extraReducers: (builder) => {
    builder.addCase(fetchItems.fulfilled, (state, action) => {
      return [...action.payload];
    });
  },
});

export const itemActions = itemSlice.actions;

export default itemSlice;

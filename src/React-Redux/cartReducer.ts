import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

export const initialCart: itemType[] = [];

export const fetchCart = createAsyncThunk("cartSlice/fetchCart", () => {
  return fetch(`${process.env.REACT_APP_MY_API_BASE_URL}/cart`)
    .then((response) => response.json())
    .catch((error) => {
      toast.error("Failed to fetch cart");
    });
});

const cartSlice = createSlice({
  name: "cart",
  initialState: initialCart,
  reducers: {
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
  extraReducers: (builder) => {
    builder.addCase(fetchCart.fulfilled, (state, action) => {
      return [...action.payload];
    });
  },
});

export const cartActions = cartSlice.actions;

export default cartSlice;

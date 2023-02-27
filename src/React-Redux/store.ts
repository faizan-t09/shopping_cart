import { configureStore } from "@reduxjs/toolkit";
import thunk from "redux-thunk";

import rootReducer from "./rootReducer";
import { useDispatch } from 'react-redux';

const store = configureStore(
  {
    reducer: rootReducer,
    middleware : (getDefaultMiddleware)=>getDefaultMiddleware().concat(thunk)
  }
);

export const useAppDispatch = useDispatch<typeof store.dispatch>;

export default store;

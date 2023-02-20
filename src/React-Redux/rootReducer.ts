import { combineReducers } from "redux";

import cartSlice from "./cartReducer";
import itemSlice from "./itemReducer";
import delSlice from "./toggleDeleteReducer";

const rootReducer = combineReducers({
  cart: cartSlice.reducer,
  item: itemSlice.reducer,
  del: delSlice.reducer,
});

export type rootStateType = ReturnType<typeof rootReducer>;

export default rootReducer;

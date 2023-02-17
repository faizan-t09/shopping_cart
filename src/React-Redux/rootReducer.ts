import { createStore } from "redux";
import { combineReducers } from "redux";

import { cartReducer } from "./cartReducer";
import { itemReducer } from "./itemReducer";
import { delReducer } from "./toggleDeleteReducer";

const rootReducer = combineReducers({
  cart: cartReducer,
  item: itemReducer,
  del: delReducer,
});

export type rootStateType = ReturnType<typeof rootReducer>;

export const rootStore = createStore(rootReducer);

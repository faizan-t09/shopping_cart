import React, { useReducer, useEffect } from "react";
import {
  initialItems,
  itemReducer,
  itemActionTypes,
} from "src/useReducer/itemReducer";
import {
  initialDel,
  delReducer,
  delActionType,
} from "src/useReducer/toggleDeleteReducer";
import {
  initialCart,
  cartReducer,
  cartActionTypes,
} from "src/useReducer/cartReducer";

export const ShopContext = React.createContext({
  del: false,
  items: [] as itemType[],
  cart: [] as itemType[],
  dispatchDel: (action: delActionType) => {},
  dispatchItems: (action: itemActionTypes) => {},
  dispatchCart: (action: cartActionTypes) => {},
});

export const ShopContextProvider: React.FC<{
  children: React.ReactElement;
}> = ({ children }) => {
  //reducer to keep track of deletion enabled/disabled
  const [del, dispatchDel] = useReducer(delReducer, initialDel);

  //reducer for storing items
  const [items, dispatchItems] = useReducer(itemReducer, initialItems);

  //reducer to fetch cart items for local storage and display
  const [cart, dispatchCart] = useReducer(cartReducer, initialCart);

  //Each time cart items are changed the updated cart items are written onto local storage
  useEffect(() => {
    localStorage.setItem("Cart", JSON.stringify(cart));
  }, [cart]);

  return (
    <ShopContext.Provider
      value={{ del, items, cart, dispatchCart, dispatchDel, dispatchItems }}
    >
      {children}
    </ShopContext.Provider>
  );
};

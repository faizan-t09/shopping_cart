import React, { useState, useEffect } from "react";
import { itemType } from "src/interfaces/Item";

export const ShopContext = React.createContext({
  del: false,
  items: [] as itemType[],
  cart: [] as itemType[],
  setDel: (value: boolean | ((prev: boolean) => boolean)) => {},
  setItems: (value: itemType[] | ((prev: itemType[]) => itemType[])) => {},
  setCart: (value: itemType[] | ((prev: itemType[]) => itemType[])) => {},
});

export const ShopContextProvider: React.FC<{
  children: React.ReactElement;
}> = ({ children }) => {
  //useState to keep track of deletion enabled/disabled
  const [del, setDel] = useState<boolean>(false);

  //useState for storing items
  const [items, setItems] = useState<itemType[]>([]);

  //useState to fetch cart items for local storage and display
  const [cart, setCart] = useState<itemType[]>(
    JSON.parse(localStorage.getItem("Cart") || "[]")
  );

  //Each time cart items are changed the updated cart items are written onto local storage
  useEffect(() => {
    localStorage.setItem("Cart", JSON.stringify(cart));
  }, [cart]);

  return (
    <ShopContext.Provider
      value={{ del, items, cart, setCart, setDel, setItems }}
    >
      {children}
    </ShopContext.Provider>
  );
};

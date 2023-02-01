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
  const [items, setItems] = useState<itemType[]>([
    {
      id: 1,
      title: "Book",
      desc: "plain ol book",
      imgsrc:
        "https://www.bookgeeks.in/wp-content/uploads/2022/11/The-Art-of-War-by-Sun-Tzu-Book.jpg",
      price: 100,
      wishlisted: false,
    },
    {
      id: 2,
      title: "cup",
      desc: "To hold your coffee",
      imgsrc: "https://m.media-amazon.com/images/I/715W6s7x9rL._SX450_.jpg",
      price: 80,
      wishlisted: false,
    },
    {
      id: 3,
      title: "chair",
      desc: "To sit comfortably",
      imgsrc:
        "https://ii1.pepperfry.com/media/catalog/product/r/o/800x880/royal-wing-chair-in-blue-colour-by-dreamzz-furniture-royal-wing-chair-in-blue-colour-by-dreamzz-furn-pitcjr.jpg",
      price: 1500,
      wishlisted: true,
    },
  ]);

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

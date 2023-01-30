import React, { useState, useEffect } from "react";
import { itemType } from "src/interfaces/Item";

export const ShopContext = React.createContext([
  { del: false, items: [] as itemType[], cart: [] as itemType[] },
  {
    setDel: (value: boolean | ((prev: boolean) => boolean)) => {},
    setItems: (value: itemType[] | ((prev: itemType[]) => itemType[])) => {},
    setCart: (value: itemType[] | ((prev: itemType[]) => itemType[])) => {},
    addNewItem: (item: itemType) => {},
    deleteItem: (itemTitle: string) => {},
    onAddToCart: (item: itemType) => {},
    onRemoveFromCart: (itemTitle: string) => {},
    toggleWishlist: (itemTitle: string) => {},
  },
]);

export const ShopContextProvider: React.FC<{
  children: React.ReactElement;
}> = ({ children }) => {
  //useState to keep track of deletion enabled/disabled
  const [del, setDel] = useState<boolean>(false);

  //useState for storing items
  const [items, setItems] = useState<itemType[]>([
    {
      title: "Book",
      desc: "plain ol book",
      imgsrc:
        "https://www.bookgeeks.in/wp-content/uploads/2022/11/The-Art-of-War-by-Sun-Tzu-Book.jpg",
      price: 100,
      wishlisted: false,
    },
    {
      title: "cup",
      desc: "To hold your coffee",
      imgsrc: "https://m.media-amazon.com/images/I/715W6s7x9rL._SX450_.jpg",
      price: 80,
      wishlisted: false,
    },
    {
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

  const handlers = {
      setDel: setDel,
      setItems: setItems,
      setCart: setCart,
      //Adds new item to the items
      addNewItem: (item: itemType): void => {
        setItems((prev) => {
          return [...prev, item];
        });
      },

      //Removes item from the items
      deleteItem: (itemTitle: string): void => {
        setItems((prev) => {
          return prev.filter((currItem) => {
            return currItem.title !== itemTitle;
          });
        });
        //Removes the item from the cart as well
        setCart((prev) => {
          return prev.filter((currItem) => {
            return currItem.title !== itemTitle;
          });
        })
      },

      //Adds a item to the cart
      onAddToCart: (item: itemType): void => {
        if (
          cart.filter((cartItem) => {
            return cartItem.title === item.title;
          }).length === 0
        ) {
          setCart([...cart, { ...item, count: 1 }]);
        } else {
          setCart((prev) => {
            return prev.map((cartItem: itemType) => {
              if (cartItem.title === item.title) {
                cartItem.count! += 1;
              }
              return cartItem;
            });
          });
        }
      },

      //Removes Item from the cart
      onRemoveFromCart: (itemTitle: string): void => {
        if (
          cart.filter((cartItem) => cartItem.title === itemTitle)[0].count! > 1
        ) {
          setCart((prev) => {
            return prev.map((cartItem) => {
              if (cartItem.title === itemTitle) {
                cartItem.count! -= 1;
              }
              return cartItem;
            });
          });
        } else {
          setCart((prev) => {
            return prev.filter((cartItem) => cartItem.title !== itemTitle);
          });
        }
      },

      //Toggles wishlist for a item
      toggleWishlist: (itemTitle: string): void => {
        setItems((prev) => {
          return prev.map((item) => {
            if (item.title === itemTitle) {
              item.wishlisted = !item.wishlisted;
            }
            return item;
          });
        });
      },
    }

  return (
    <ShopContext.Provider value={[{ del, items, cart }, handlers]}>
      {children}
    </ShopContext.Provider>
  );
};

import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";

import { HomePage } from "./pages/HomePage";
import { AdminPage } from "./pages/AdminPage";
import { ShopPage } from "./pages/ShopPage";
import { CartPage } from "./pages/CartPage";

import { itemType } from "./interfaces/Item";

function App(): JSX.Element {
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

  //Adds new item to the items
  const addNewItem = (item: itemType): void => {
    setItems((prev) => {
      return [...prev, item];
    });
  };

  //Removes item from the items
  const deleteItem = (itemTitle: string): void => {
    setItems((prev) => {
      return prev.filter((currItem) => {
        return currItem.title !== itemTitle;
      });
    });
  };

  //Adds a item to the cart
  const onAddToCart = (item: itemType): void => {
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
  };

  //Removes Item from the cart
  const onRemoveFromCart = (itemTitle: string): void => {
    if (cart.filter((cartItem) => cartItem.title === itemTitle)[0].count! > 1) {
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
  };

  //Toggles wishlist for a item
  const toggleWishlist = (itemTitle: string): void => {
    setItems((prev) => {
      return prev.map((item) => {
        if (item.title === itemTitle) {
          item.wishlisted = !item.wishlisted;
        }
        return item;
      });
    });
  };

  return (
    <div className="App">
      <Routes>
        <Route
          path="/"
          element={
            <HomePage
              items={items}
              del={del}
              deleteItem={deleteItem}
              onAddToCart={onAddToCart}
              toggleWishlist={toggleWishlist}
              setDel={setDel}
            />
          }
        />
        <Route path="/admin" element={<AdminPage addNewItem={addNewItem} />} />
        <Route
          path="/shop"
          element={
            <ShopPage
              items={items}
              del={del}
              deleteItem={deleteItem}
              onAddToCart={onAddToCart}
              toggleWishlist={toggleWishlist}
            />
          }
        />
        <Route
          path="/cart"
          element={
            <CartPage
              cart={cart}
              del={del}
              onRemoveFromCart={onRemoveFromCart}
            />
          }
        />
      </Routes>
    </div>
  );
}

export default App;

import React, { useState, useEffect } from "react";
import "./App.css";
import { Card } from "./components/Card";
import { CartCard } from "./components/CartCard";
import { NewItemForm } from "./components/NewItemForm";

import { itemType } from "./interfaces/Item";



function App(): JSX.Element {
  const [del, setDel] = useState<boolean>(false);
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
  const [cart, setCart] = useState<itemType[]>(
    JSON.parse(localStorage.getItem("Cart") || "[]")
  );
  const [formOpen, setFormOpen] = useState<boolean>(false);

  useEffect(() => {
    localStorage.setItem("Cart", JSON.stringify(cart));
  }, [cart]);

  const addNewItem = (item: itemType): void => {
    setItems((prev) => {
      return [...prev, item];
    });
  };

  const deleteItem = (itemTitle: string): void => {
    setItems((prev) => {
      return prev.filter((currItem) => {
        return currItem.title !== itemTitle;
      });
    });
  };

  const onAddToCart = (item: itemType): void => {
    setCart((prev) => {
      return [...prev, item];
    });
  };

  const onRemoveFromCart = (itemTitle: string): void => {
    setCart((prev) => {
      return prev.filter((currItem: itemType) => currItem.title !== itemTitle);
    });
  };

  const toggleWishlist = (itemTitle: string): void => {
    setItems((prev) => {
      return prev.map((item) => {
        if(item.title===itemTitle)
          item.wishlisted = !item.wishlisted;
        return item;
      });
    });
  };

  return (
    <div className="App">
      <header className="App-header">Welcome</header>
      <label style={{ fontSize: "20px" }}>Delete</label>
      <input
        type="checkbox"
        onChange={() => {
          setDel((prev) => {
            return !prev;
          });
        }}
        checked={del}
      ></input>
      <div className="section-container">
        <div className="section">
          <h1 className="section-heading">
            Items
            <button
              onClick={() => {
                setFormOpen(true);
              }}
            >
              Add Item +
            </button>
          </h1>

          <div className="card-container">
            {items?.map((item) => {
              return (
                <Card
                  key={item?.imgsrc}
                  item={item}
                  del={del}
                  deleteItem={deleteItem}
                  onAddToCart={onAddToCart}
                  toggleWishlist={toggleWishlist}
                />
              );
            })}
          </div>
        </div>
        <div className="section">
          <h1 className="section-heading">Cart</h1>
          <div className="card-container">
            {cart.length ? (
              cart?.map((item: itemType) => {
                return (
                  <CartCard
                    key={item?.imgsrc}
                    item={item}
                    del={del}
                    deleteItem={onRemoveFromCart}
                  />
                );
              })
            ) : (
              <h1 className="cart-placeholder">No items in cart.</h1>
            )}
          </div>
        </div>
      </div>
      <NewItemForm
        formOpen={formOpen}
        closeForm={() => {
          setFormOpen(false);
        }}
        addNewItem={addNewItem}
      />
    </div>
  );
}

export default App;

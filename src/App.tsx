import React, { useEffect } from "react";
import "./App.css";
import { Card } from "./components/Card";
import { useState } from "react";

interface itemType {
  title: string;
  desc: string;
  imgsrc: string;
}

function App(): JSX.Element {
  const [del, setDel] = useState<boolean>(false);
  const [items, setItems] = useState<itemType[]>([
    {
      title: "Book",
      desc: "plain ol book",
      imgsrc:
        "https://www.bookgeeks.in/wp-content/uploads/2022/11/The-Art-of-War-by-Sun-Tzu-Book.jpg",
    },
    {
      title: "cup",
      desc: "To hold your coffee",
      imgsrc: "https://m.media-amazon.com/images/I/715W6s7x9rL._SX450_.jpg",
    },
    {
      title: "chair",
      desc: "To sit comfortably",
      imgsrc:
        "https://ii1.pepperfry.com/media/catalog/product/r/o/800x880/royal-wing-chair-in-blue-colour-by-dreamzz-furniture-royal-wing-chair-in-blue-colour-by-dreamzz-furn-pitcjr.jpg",
    },
  ]);
  const [cart, setCart] = useState<itemType[]>(
    JSON.parse(localStorage.getItem("Cart") || "[]")
  );

  useEffect(() => {
    localStorage.setItem("Cart", JSON.stringify(cart));
  }, [cart]);

  const deleteItem = (item: itemType): void => {
    setItems((prev) => {
      return prev.filter((currItem) => {
        return currItem.title !== item.title;
      });
    });
  };

  const onAddToCart = (item: itemType): void => {
    setCart((prev) => {
      return [...prev, item];
    });
  };

  const onRemoveFromCart = (item: itemType): void => {
    setCart((prev) => {
      return prev.filter((currItem: itemType) => currItem.title !== item.title);
    });
  };

  return (
    <div className="App">
      <header className="App-header">Welcome</header>
      <label>Delete</label>
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
          <h1 className="section-heading">Items</h1>
          <div className="card-container">
            {items?.map((item) => {
              return (
                <Card
                  key={item?.imgsrc}
                  item={item}
                  del={del}
                  deleteItem={deleteItem}
                  onAddToCart={onAddToCart}
                />
              );
            })}
          </div>
        </div>
        <div className="section">
          <h1 className="section-heading">Cart</h1>
          <div className="card-container">
            {cart?.map(
              (item: itemType) => {
                return (
                  <Card
                    key={item?.imgsrc}
                    item={item}
                    del={del}
                    deleteItem={onRemoveFromCart}
                  />
                );
              }
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;

import "./App.css";
import { Card } from "./components/Card.js";
import { useState } from "react";

function App() {
  const [items, setItems] = useState([
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

  const [del, setDel] = useState(false);

  const deleteItem = (item) => {
    setItems((prev) => {
      return prev.filter((currItem) => {
        return currItem.title !== item.title;
      });
    });
  };

  return (
    <div className="App">
      <header className="App-header">Welcome</header>
      <label>Delete</label>
      <input
        type="checkbox"
        onClick={() => {
          setDel((prev) => {
            return !prev;
          });
        }}
        value={del}
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
                  delete={del}
                  deleteItem={deleteItem}
                />
              );
            })}
          </div>
        </div>
        <div className="section">
          <h1 className="section-heading">Cart</h1>
          <div className="card-container"></div>
        </div>
      </div>
    </div>
  );
}

export default App;

import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import "./Card.css";
import { HiXMark } from "react-icons/hi2";

import { itemType } from "../interfaces/Item";

import { ShopContext } from "src/context/ShopContext";

interface propType {
  item: itemType;
}

export const Card: React.FC<propType> = ({ item }: propType): JSX.Element => {
  const navigate = useNavigate();
  const { del, cart, setItems, setCart } = useContext(ShopContext);

  //Removes item from the items
  const deleteItem = (itemId: number): void => {
    setItems((prev) => {
      return prev.filter((currItem) => {
        return currItem.id !== itemId;
      });
    });
    //Removes the item from the cart as well
    setCart((prev) => {
      return prev.filter((currItem) => {
        return currItem.id !== itemId;
      });
    });
  };

  //Toggles wishlist for a item
  const toggleWishlist = (itemId: number): void => {
    setItems((prev) => {
      return prev.map((item) => {
        if (item.id === itemId) {
          item.wishlisted = !item.wishlisted;
        }
        return item;
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

  return (
    <>
      <div
        className="card"
        onClick={() => {
          navigate(`/shop/${item.id}`);
        }}
      >
        <img src={item.imgsrc} alt="product visual"></img>
        {del && (
          <HiXMark
            className="delete-icon"
            size="20px"
            color="red"
            onClick={(e) => {
              e.stopPropagation();
              deleteItem!(item.id);
            }}
          />
        )}
        <h1>{item.title}</h1>
        <p>{item.desc}</p>
        <p>{item.price}/-</p>
        <div className="actions">
          <button
            onClick={(e) => {
              e.stopPropagation();
              toggleWishlist!(item.id);
            }}
          >
            {item.wishlisted ? "Added to Wish List" : "Wish list"}
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onAddToCart!(item);
            }}
          >
            Add to cart
          </button>
        </div>
      </div>
    </>
  );
};

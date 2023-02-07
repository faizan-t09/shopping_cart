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
    deleteItemFromDb(itemId);
  };

  const deleteItemFromDb = async (id: Number) => {
    await fetch(`${process.env.REACT_APP_MY_API_BASE_URL}/product/${id}`, {
      method: "DELETE",
    })
      .then((res) => res.text())
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.log(error);
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
    updateWishlistOnDb(itemId);
  };

  //Adds a item to the cart
  const onAddToCart = (item: itemType): void => {
    if (
      cart.filter((cartItem) => {
        return cartItem.id === item.id;
      }).length === 0
    ) {
      setCart([...cart, { ...item, count: 1 }]);
    } else {
      setCart((prev) => {
        return prev.map((cartItem: itemType) => {
          if (cartItem.id === item.id) {
            cartItem.count! += 1;
          }
          return cartItem;
        });
      });
    }
  };

  const postAddToCart = (id: Number) => {
    fetch(`${process.env.REACT_APP_MY_API_BASE_URL}/cart/${id}`, {
      method: "POST",
    })
      .then(() => {
        console.log("Added to cart sucessfully");
      })
      .catch(() => {
        console.log("Failed to add to cart");
      });
  };

  const updateWishlistOnDb = (id: Number) => {
    fetch(`${process.env.REACT_APP_MY_API_BASE_URL}/product/wishlist/${id}`, {
      method: "POST",
    })
      .then(() => {
        console.log("Toggled wishlist sucessfully");
      })
      .catch(() => {
        console.log("Failed toggled wishlist");
      });
  };

  return (
    <>
      <div
        className="card"
        onClick={() => {
          navigate(`/shop/${item.id}`);
        }}
      >
        <img src={item.image} alt="product visual"></img>
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
        <h4>{item.title.slice(0, 40) + "..."}</h4>
        <p>{item.description.slice(0, 100) + "..."}</p>
        <p>{item.price}/-</p>
        <div className="actions">
          <button
            onClick={(e) => {
              e.stopPropagation();
              toggleWishlist!(item.id);
            }}
          >
            {item.wishlisted ? "WishListed" : "Add to WishList"}
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onAddToCart!(item);
              postAddToCart(item.id);
            }}
          >
            Add to cart
          </button>
        </div>
      </div>
    </>
  );
};

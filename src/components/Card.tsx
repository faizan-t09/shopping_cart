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
  const { del, cart, dispatchItems, dispatchCart } = useContext(ShopContext);

  //Removes item from the items
  const deleteItem = (itemId: number): void => {
      .then((res) => res.text())
      .then((data) => {
        console.log(data);
        dispatchItems({ type: "Delete", payload: { itemId: itemId } });
        //Removes the item from the cart as well
        dispatchCart({ type: "Delete", payload: { itemId: itemId } });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const deleteItemFromDb = async (id: Number) => {
    return await fetch(
      `${process.env.REACT_APP_MY_API_BASE_URL}/product/${id}`,
      {
        method: "DELETE",
      }
    );
  };

  //Toggles wishlist for a item
  const toggleWishlist = (itemId: number): void => {
    fetch(
      `${process.env.REACT_APP_MY_API_BASE_URL}/product/wishlist/${itemId}`,
      {
        method: "POST",
      }
    )
      .then(() => {
        dispatchItems({ type: "ToggleWishlist", payload: { itemId: itemId } });
      })
      .catch(() => {
      });
  };

  //Adds a item to the cart
  const onAddToCart = (item: itemType): void => {
    if (
      cart.filter((cartItem) => {
        return cartItem.id === item.id;
      }).length === 0
    ) {
      dispatchCart({ type: "Add", payload: { ...item, count: 1 } });
    } else {
      dispatchCart({
        type: "Increament quantity",
        payload: { itemId: item.id },
      });
    }
  };

  const postAddToCart = (id: Number) => {
    fetch(`${process.env.REACT_APP_MY_API_BASE_URL}/cart/${id}`, {
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

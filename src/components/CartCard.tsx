import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import "./Card.css";
import { HiXMark } from "react-icons/hi2";
import { ShopContext } from "src/context/ShopContext";
import { itemType } from "../interfaces/Item";
import { toast } from "react-toastify";

interface propType {
  item: itemType;
}

export const CartCard: React.FC<propType> = ({
  item,
}: propType): JSX.Element => {
  const navigate = useNavigate();
  const { del, cart, dispatchCart } = useContext(ShopContext);

  //Removes Item from the cart
  const onRemoveFromCart = (itemId: number): void => {
    removeFromDbCart(itemId)
      .then(() => {
        toast.success("Removed from cart sucessfully");
        if (cart.filter((cartItem) => cartItem.id === itemId)[0].count! > 1) {
          dispatchCart({
            type: "Decreament quantity",
            payload: { itemId: item.id },
          });
        } else {
          dispatchCart({ type: "Delete", payload: { itemId: itemId } });
        }
      })
      .catch(() => {
        toast.error("Failed to remove from cart");
      });
  };

  const removeFromDbCart = (id: Number) => {
    return fetch(`${process.env.REACT_APP_MY_API_BASE_URL}/cart/${id}`, {
      method: "DELETE",
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
              onRemoveFromCart(item.id);
            }}
          />
        )}
        <h1>{item.title.slice(0, 40) + "..."}</h1>
        <p>{item.description.slice(0, 100) + "..."}</p>
        <p>{item.price * item.count!}/-</p>
        <p>
          <b>Quantity :{item.count}</b>
        </p>
      </div>
    </>
  );
};

import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import "./Card.css";
import { HiXMark } from "react-icons/hi2";
import { ShopContext } from "src/context/ShopContext";
import { itemType } from "../interfaces/Item";

interface propType {
  item: itemType;
}

export const CartCard: React.FC<propType> = ({
  item,
}: propType): JSX.Element => {
  const navigate = useNavigate();
  const { del, cart, setCart } = useContext(ShopContext);

  //Removes Item from the cart
  const onRemoveFromCart = (itemId: number): void => {
    if (cart.filter((cartItem) => cartItem.id === itemId)[0].count! > 1) {
      setCart((prev) => {
        return prev.map((cartItem) => {
          if (cartItem.id === itemId) {
            cartItem.count! -= 1;
          }
          return cartItem;
        });
      });
    } else {
      setCart((prev) => {
        return prev.filter((cartItem) => cartItem.id !== itemId);
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
        <img src={item.image} alt="product visual"></img>
        {del && (
          <HiXMark
            className="delete-icon"
            size="20px"
            color="red"
            onClick={(e) => {
              e.stopPropagation();
              onRemoveFromCart!(item.id);
            }}
          />
        )}
        <h1>{item.title.slice(0,40)+"..."}</h1>
        <p>{item.description.slice(0,100)+"..."}</p>
        <p>{item.price * item.count!}/-</p>
        <p>
          <b>Quantity :{item.count}</b>
        </p>
      </div>
    </>
  );
};

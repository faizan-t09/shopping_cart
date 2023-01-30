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
  const [{ del }, { onRemoveFromCart }] = useContext(ShopContext);

  return (
    <>
      <div
        className="card"
        onClick={() => {
          navigate(`/shop/${item.title}`);
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
              onRemoveFromCart!(item.id);
            }}
          />
        )}
        <h1>{item.title}</h1>
        <p>{item.desc}</p>
        <p>{item.price * item.count!}/-</p>
        <p>
          <b>Quantity :{item.count}</b>
        </p>
      </div>
    </>
  );
};

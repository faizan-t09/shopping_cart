import React from "react";
import {useNavigate} from 'react-router-dom';
import "./Card.css";
import { HiXMark } from "react-icons/hi2";

import { itemType } from "../interfaces/Item";

interface propType {
  del: boolean;
  item: itemType;
  deleteItem: (itemTitle: string) => void;
}

export const CartCard: React.FC<propType> = ({
  del,
  item,
  deleteItem,
}: propType): JSX.Element => {
  const navigate = useNavigate()

  return (
    <>
      <div
        className="card"
        onClick={() => {
          navigate(`/shop/${item.title}`)
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
              deleteItem(item.title);
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

import React from "react";
import "./Card.css";
import { useState } from "react";
import { HiXMark } from "react-icons/hi2";
import { Modal } from "./Modal";

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
  const [modal, setModal] = useState(false);

  return (
    <>
      <div
        className="card"
        onClick={() => {
          setModal(true);
          console.log("Modal");
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
        <p>{item.price}/-</p>
      </div>
      <Modal
        open={modal}
        closeModal={() => {
          setModal(false);
        }}
        item={item}
      />
    </>
  );
};

import React from "react";
import "./Card.css";
import { useState } from "react";
import { HiXMark } from "react-icons/hi2";
import { Modal } from "./Modal";

interface itemType {
  title: string;
  desc: string;
  imgsrc: string;
}

interface propType {
  del: boolean;
  item: itemType;
  deleteItem: (item: itemType) => void;
}

export const Card: React.FC<propType> = ({
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
        {del ? (
          <HiXMark
            className="delete-icon"
            size="20px"
            color="red"
            onClick={(e) => {
              e.stopPropagation();
              deleteItem(item);
            }}
          />
        ) : (
          <></>
        )}
        <img src={item.imgsrc} alt="product visual"></img>
        <h1>{item.title}</h1>
        <p>{item.desc}</p>
        <div className="actions">
          <button
            onClick={(e) => {
              e.stopPropagation();
              console.log("Wish list");
            }}
          >
            Wish list
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              console.log("Add to cart");
            }}
          >
            Add to cart
          </button>
        </div>
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

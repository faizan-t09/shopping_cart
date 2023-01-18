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
  onAddToCart: (item: itemType) => void;
  toggleWishlist: (title: string) => void;
}

export const Card: React.FC<propType> = ({
  del,
  item,
  deleteItem,
  onAddToCart,
  toggleWishlist,
}: propType): JSX.Element => {
  const [modal, setModal] = useState(false);

  return (
    <>
      <div
        className="card"
        onClick={() => {
          setModal(true);
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
        <div className="actions">
          <button
            onClick={(e) => {
              e.stopPropagation();
              toggleWishlist(item.title);
            }}
          >
            {item.wishlisted ? "Added to Wish List" : "Wish list"}
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onAddToCart(item);
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

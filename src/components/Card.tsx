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
  const [{ del }, { deleteItem, toggleWishlist, onAddToCart }] =
    useContext(ShopContext);

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

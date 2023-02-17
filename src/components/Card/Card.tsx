import React from "react";
import { useNavigate } from "react-router-dom";
import {useSelector} from 'react-redux';
import "./Card.css";
import { HiXMark } from "react-icons/hi2";
import { rootStateType } from "src/React-Redux/rootReducer";


interface propType {
  item: itemType;
  deleteProduct: (itemId: number) => void;
  addToCart?: (item: itemType) => void;
  toggleWishlist?: (itemId: number) => void;
}

export const Card: React.FC<propType> = ({
  item,
  deleteProduct,
  addToCart,
  toggleWishlist,
}: propType): JSX.Element => {
  const navigate = useNavigate();
  const del  = useSelector((state : rootStateType)=>state.del);

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
              deleteProduct(item.id);
            }}
          />
        )}
        <h4>{item.title.slice(0, 40) + "..."}</h4>
        <p>{item.description.slice(0, 100) + "..."}</p>

        {addToCart && toggleWishlist ? (
          <>
            <p>{item.price}/-</p>
            <div className="actions">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  toggleWishlist(item.id);
                }}
              >
                {item.wishlisted ? "WishListed" : "Add to WishList"}
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  addToCart(item);
                }}
              >
                Add to cart
              </button>
            </div>
          </>
        ) : (
          <>
            <p>{item.price * item.count!}/-</p>
            <p>
              <b>Quantity :{item.count}</b>
            </p>
          </>
        )}
      </div>
    </>
  );
};

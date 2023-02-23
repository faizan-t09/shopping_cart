import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import "./Card.css";
import { HiXMark } from "react-icons/hi2";
import { ShopContext } from "src/context/ShopContext";

interface cardPropType {
  item: itemType;
  deleteProduct: (itemId: number) => void;
  addToCart?: (item: itemType) => void;
  toggleWishlist?: (itemId: number) => void;
}

export const Card: React.FC<cardPropType> = ({
  item,
  deleteProduct,
  addToCart,
  toggleWishlist,
}: cardPropType): JSX.Element => {
  const navigate = useNavigate();
  const { del } = useContext(ShopContext);

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

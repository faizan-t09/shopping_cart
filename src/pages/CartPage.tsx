import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { itemType } from "src/interfaces/Item";
import { CartCard } from "src/components/CartCard";
import { ShopContext } from "src/context/ShopContext";

export const CartPage: React.FC = () => {
  const navigate = useNavigate();
  const [{ cart }] = useContext(ShopContext);
  return (
    <div>
      <div className="form-actions">
        <button
          onClick={() => {
            navigate("/");
          }}
        >
          Home
        </button>
        <button
          onClick={() => {
            navigate("/shop");
          }}
        >
          Shop
        </button>
      </div>
      <div className="card-container">
        {cart!.length ? (
          cart?.map((item: itemType) => {
            return <CartCard key={item.id} item={item} />;
          })
        ) : (
          <h1 className="cart-placeholder">No items in cart.</h1>
        )}
      </div>
    </div>
  );
};

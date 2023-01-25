import React from "react";
import { useNavigate } from "react-router-dom";
import { itemType } from "src/interfaces/Item";
import { CartCard } from "src/components/CartCard";

interface CartPageProps {
  cart: itemType[];
  del: boolean;
  onRemoveFromCart: (itemTitle: string) => void;
}

export const CartPage: React.FC<CartPageProps> = ({
  cart,
  del,
  onRemoveFromCart,
}) => {
  const navigate = useNavigate();
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
        {cart.length ? (
          cart?.map((item: itemType) => {
            return (
              <CartCard
                key={item.imgsrc}
                item={item}
                del={true}
                deleteItem={onRemoveFromCart}
              />
            );
          })
        ) : (
          <h1 className="cart-placeholder">No items in cart.</h1>
        )}
      </div>
    </div>
  );
};

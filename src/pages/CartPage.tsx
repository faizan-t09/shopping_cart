import React from "react";
import { Card } from "src/components/Card/Card";
import useCartActionsHelper from "src/hooks/useCartActionsHelper";
import { useSelector } from "react-redux";
import { rootStateType } from "../React-Redux/rootReducer";

export const CartPage: React.FC = () => {
  const cart = useSelector((state: rootStateType) => state.cart);
  const { onRemoveFromCart } = useCartActionsHelper();

  return (
    <div>
      <div className="card-container">
        {cart?.length ? (
          cart?.map((item: itemType) => {
            return (
              <Card
                key={item.id}
                item={item}
                deleteProduct={onRemoveFromCart}
              />
            );
          })
        ) : (
          <h1 className="noItemsMsg">No items in cart.</h1>
        )}
      </div>
    </div>
  );
};

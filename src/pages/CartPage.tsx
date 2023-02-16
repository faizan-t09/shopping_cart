import React, { useContext } from "react";
import { Card } from "src/components/Card/Card";
import useCartActionsHelper from "src/components/Card/useCartActionsHelper";
import { ShopContext } from "src/context/ShopContext";

export const CartPage: React.FC = () => {
  const { cart } = useContext(ShopContext);
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

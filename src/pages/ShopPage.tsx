import React, { useContext } from "react";
import { Card } from "src/components/Card/Card";
import useItemActionsHelper from "src/components/Card/useItemActionsHelper";

import { ShopContext } from "src/context/ShopContext";

export const ShopPage: React.FC = () => {
  const { items } = useContext(ShopContext);
  const { deleteItem, toggleWishlist, onAddToCart } = useItemActionsHelper();

  return (
    <div>
      <div className="card-container">
        {items.length ? (
          items?.map((item) => {
            return (
              <Card
                key={item.id}
                item={item}
                deleteProduct={deleteItem}
                addToCart={onAddToCart}
                toggleWishlist={toggleWishlist}
              />
            );
          })
        ) : (
          <h1 className="noItemsMsg">"No Items to Display"</h1>
        )}
      </div>
    </div>
  );
};

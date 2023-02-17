import React from "react";
import { Card } from "src/components/Card/Card";
import useItemActionsHelper from "src/hooks/useItemActionsHelper";
import { useSelector } from "react-redux";
import { rootStateType } from "src/React-Redux/rootReducer";

export const ShopPage: React.FC = () => {
  const items = useSelector((state : rootStateType) => state.item);
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

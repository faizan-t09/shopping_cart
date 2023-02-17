import React from "react";
import { Header } from "src/components/Header/Header";
import { Card } from "src/components/Card/Card";
import useItemActionsHelper from "src/hooks/useItemActionsHelper";
import { useSelector } from "react-redux";
import { rootStateType } from "../React-Redux/rootReducer";

export const HomePage: React.FC = () => {
  const items = useSelector((state: rootStateType) => state.item);
  const { deleteItem, toggleWishlist, onAddToCart } = useItemActionsHelper();

  return (
    <div>
      <Header />

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

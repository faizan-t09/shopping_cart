import React from "react";
import { useNavigate } from "react-router-dom";
import { Card } from "src/components/Card";
import { itemType } from "src/interfaces/Item";

interface ShopPageProps {
  items: itemType[];
  del: boolean;
  deleteItem: (itemTitle: string) => void;
  onAddToCart: (item: itemType) => void;
  toggleWishlist: (title: string) => void;
}

export const ShopPage: React.FC<ShopPageProps> = ({
  items,
  del,
  deleteItem,
  onAddToCart,
  toggleWishlist,
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
            navigate("/cart");
          }}
        >
          Cart
        </button>
      </div>
      <div className="card-container">
        {items?.map((item) => {
          return (
            <Card
              key={item?.imgsrc}
              item={item}
              del={del}
              deleteItem={deleteItem}
              onAddToCart={onAddToCart}
              toggleWishlist={toggleWishlist}
            />
          );
        })}
      </div>
    </div>
  );
};

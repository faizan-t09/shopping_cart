import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Card } from "src/components/Card";

import { ShopContext } from "src/context/ShopContext";

export const ShopPage: React.FC = () => {
  const navigate = useNavigate();
  const [{ items }] = useContext(ShopContext);

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
          return <Card key={item.id} item={item} />;
        })}
      </div>
    </div>
  );
};

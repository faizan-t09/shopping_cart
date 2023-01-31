import React, { useContext } from "react";
import { Card } from "src/components/Card";

import { ShopContext } from "src/context/ShopContext";

export const ShopPage: React.FC = () => {
  const [{ items }] = useContext(ShopContext);

  return (
    <div>
      <div className="card-container">
        {items?.map((item) => {
          return <Card key={item.id} item={item} />;
        })}
      </div>
    </div>
  );
};

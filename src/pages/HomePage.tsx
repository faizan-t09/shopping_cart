import React, { useContext } from "react";
import { Header } from "src/components/Header/Header";
import { Card } from "src/components/Card/Card";

import { ShopContext } from "src/context/ShopContext";

export const HomePage: React.FC = () => {
  const { items } = useContext(ShopContext);

  return (
    <div>
      <Header />

      <div className="card-container">
        {items.length ? items?.map((item) => {
          return <Card key={item.id} item={item} />;
        }):"No Items to Display"}
      </div>
    </div>
  );
};

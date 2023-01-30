import React, { useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { Header } from "src/components/Header";
import { Card } from "src/components/Card";

import { ShopContext } from "src/context/ShopContext";

export const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const [{ del, items }, { setDel }] = useContext(ShopContext);

  return (
    <div>
      <Header del={del!} setDel={setDel!} />

      <div className="form-actions">
        <button
          onClick={() => {
            navigate("/shop");
          }}
        >
          Shop
        </button>
        <button
          onClick={() => {
            navigate("/cart");
          }}
        >
          Cart
        </button>
      </div>
      
      <NavLink to="/admin">
        <button>Add new Item</button>
      </NavLink>

      <div className="card-container">
        {items?.map((item) => {
          return <Card key={item.id} item={item} />;
        })}
      </div>
    </div>
  );
};

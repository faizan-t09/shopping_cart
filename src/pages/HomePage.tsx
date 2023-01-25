import React from "react";
import { NavLink,useNavigate } from "react-router-dom";
import { Header } from "src/components/Header";
import { Card } from "src/components/Card";

import { itemType } from "../interfaces/Item";

interface HomePageProps {
  items: itemType[];
  del: boolean;
  deleteItem: (itemTitle: string) => void;
  onAddToCart: (item: itemType) => void;
  toggleWishlist: (title: string) => void;
  setDel: (value: boolean | ((prev: boolean) => boolean)) => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  items,
  del,
  deleteItem,
  onAddToCart,
  toggleWishlist,
  setDel,
}: HomePageProps) => {
    const navigate = useNavigate();

  return (
    <div>
      <Header del={del} setDel={setDel} />

      <div className="form-actions">
        <button onClick={()=>{navigate("/shop")}}>Shop</button>
        <button onClick={()=>{navigate("/cart")}}>Cart</button>
      </div>
      <NavLink to="/admin">
        <button>Add new Item</button>
      </NavLink>
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

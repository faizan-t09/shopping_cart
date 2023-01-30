import React, { useContext } from "react";
import { NewItemForm } from "src/components/NewItemForm";
import { ShopContext } from "src/context/ShopContext";

export const AdminPage: React.FC = () => {
  const [{ addNewItem }] = useContext(ShopContext);
  return <NewItemForm addNewItem={addNewItem!} />;
};

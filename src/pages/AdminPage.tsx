import React from "react";
import { NewItemForm } from "src/components/NewItemForm";
import { itemType } from "src/interfaces/Item";

interface AdminPageProps {
  addNewItem: (item: itemType) => void;
}

export const AdminPage: React.FC<AdminPageProps> = ({ addNewItem }) => {
  return <NewItemForm addNewItem={addNewItem} />;
};

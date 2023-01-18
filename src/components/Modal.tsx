import React from "react";
import "./Modal.css";

import { itemType } from "src/interfaces/Item";

interface modalProps {
  open: boolean;
  closeModal: () => void;
  item: itemType;
}

export const Modal: React.FC<modalProps> = ({
  open,
  closeModal,
  item,
}: modalProps): JSX.Element | null => {
  if (!open) return null;
  return (
    <div className="modal-container">
      <div className="modal">
        <img src={item.imgsrc} alt="product visual" />
        <h1>{item.title}</h1>
        <p>{item.desc}</p>
        <p>{item.price}/-</p>
        <button onClick={closeModal}>Close</button>
      </div>
    </div>
  );
};

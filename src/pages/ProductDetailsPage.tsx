import React from "react";
import {useNavigate,useParams} from 'react-router-dom';
import "../components/Modal.css";

import { itemType } from "src/interfaces/Item";

interface modalProps {
  items: itemType[];
}

export const ProductDetailsPage: React.FC<modalProps> = ({
  items,
}: modalProps): JSX.Element | null => {
  const navigate = useNavigate();
  const params = useParams();
  const item = items.filter((item)=>item.title===params.productTitle);
  return (
    <div className="modal-container">
      <h2>Product Details</h2>
      <div className="modal">
        <img src={item[0]?.imgsrc} alt="product visual" />
        <h1>{item[0]?.title}</h1>
        <p>{item[0]?.desc}</p>
        <p>{item[0]?.price}/-</p>
        <button onClick={()=>{navigate(-1)}}>Back</button>
      </div>
    </div>
  );
};

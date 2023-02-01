import React, { useContext, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "../components/Modal.css";
import { ShopContext } from "src/context/ShopContext";

export const ProductDetailsPage: React.FC = () => {
  const navigate = useNavigate();
  const { items } = useContext(ShopContext);
  const params = useParams();
  const item = items!.filter((item) => item.id === Number(params.productId));
  useEffect(() => {
    if (item.length === 0) {
      navigate("/notfound");
    }
  });
  return (
    <div className="modal-container">
      <h2>Product Details</h2>
      <div className="modal">
        <img src={item[0]?.imgsrc} alt="product visual" />
        <h1>{item[0]?.title}</h1>
        <p>{item[0]?.desc}</p>
        <p>{item[0]?.price}/-</p>
        <button
          onClick={() => {
            navigate(-1);
          }}
        >
          Back
        </button>
      </div>
    </div>
  );
};

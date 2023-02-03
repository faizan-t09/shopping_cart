import React, { useState, useContext, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "../components/Modal.css";
import { ShopContext } from "src/context/ShopContext";

export const ProductDetailsPage: React.FC = () => {
  const navigate = useNavigate();
  const { items } = useContext(ShopContext);
  const params = useParams();
  const [item, setItem] = useState(
    items!.filter((item) => item.id === Number(params.productId))
  );
  useEffect(() => {
    if (items.length === 0) {
      fetch(`${process.env.REACT_APP_API_BASE_URL}/products/${params.productId}`)
        .then((res) => res.json())
        .then((data) => setItem([data]))
        .catch((error) => {
          navigate("/notfound");
        });
    }
  });
  return (
    <div className="modal-container">
      <div className="modal">
        <img src={item[0]?.image} alt="product visual" />
        <h1>{item[0]?.title}</h1>
        <p>{item[0]?.description}</p>
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

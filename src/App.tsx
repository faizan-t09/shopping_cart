import React, { useContext, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";

import { HomePage } from "./pages/HomePage";
import { AdminPage } from "./pages/AdminPage";
import { ShopPage } from "./pages/ShopPage";
import { CartPage } from "./pages/CartPage";
import { ProductDetailsPage } from "./pages/ProductDetailsPage";
import NotFoundPage from "./pages/NotFoundPage";
import NavBar from "./components/NavBar";

import { ShopContext } from "./context/ShopContext";
import { itemType } from "./interfaces/Item";

function App(): JSX.Element {
  const { setItems } = useContext(ShopContext);

  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then((data) =>
        setItems(
          data.map((item: itemType) => {
            return { ...item, wishlisted: false };
          })
        )
      );
  }, []);

  return (
    <div className="App">
      <NavBar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/shop" element={<ShopPage />} />
        <Route path="/shop/:productId" element={<ProductDetailsPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </div>
  );
}

export default App;

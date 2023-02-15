import React, { useState, useContext, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";

import { HomePage } from "./pages/HomePage";
import { AdminPage } from "./pages/AdminPage";
import { ShopPage } from "./pages/ShopPage";
import { CartPage } from "./pages/CartPage";
import { ProductDetailsPage } from "./pages/ProductDetailsPage";
import NotFoundPage from "./pages/NotFoundPage";
import NavBar from "./components/NavBar";
import { LoadingHOC } from "./components/LoadingHOC";

import { ShopContext } from "./context/ShopContext";
import { itemType } from "./interfaces/Item";

function App(): JSX.Element {
  const { dispatchItems, dispatchCart } = useContext(ShopContext);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    fetch(`${process.env.REACT_APP_MY_API_BASE_URL}/product/getAll`)
      .then((res) => res.json())
      .then((data) => dispatchItems({ type: "Initialize", payload: data }))
      .catch((error) => {
        console.log(`Error : ${error}`);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_MY_API_BASE_URL}/cart`)
      .then((res) => res.json())
      .then((data) => dispatchCart({ type: "Initialize", payload: data }))
      .catch((error) => {
        console.log(`Error : ${error}`);
      });
  }, []);

  return (
    <div className="App">
      <NavBar />
      <Routes>
        <Route
          path="/"
          element={<LoadingHOC Wrapped={HomePage} loading={isLoading} />}
        />
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

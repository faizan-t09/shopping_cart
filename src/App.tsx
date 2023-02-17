import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import { useDispatch } from "react-redux";

import { HomePage } from "./pages/HomePage";
import { AdminPage } from "./pages/AdminPage";
import { ShopPage } from "./pages/ShopPage";
import { CartPage } from "./pages/CartPage";
import { ProductDetailsPage } from "./pages/ProductDetailsPage";
import NotFoundPage from "./pages/NotFoundPage";
import NavBar from "./components/NavBar/NavBar";
import { LoadingHOC } from "./components/LoadingHigherOrderComponent/LoadingHOC";

import cartAction from "./React-Redux/actions/cartActions";
import itemAction from "./React-Redux/actions/itemActions";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App(): JSX.Element {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    fetch(`${process.env.REACT_APP_MY_API_BASE_URL}/product/getAll`)
      .then((res) => res.json())
      .then((data) => dispatch(itemAction.initialize(data)))
      .catch((error) => {
        toast.error(`Failed to fetch items.`);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_MY_API_BASE_URL}/cart`)
      .then((res) => res.json())
      .then((data) => dispatch(cartAction.initialize(data)))
      .catch((error) => {
        toast.error(`Failed to fetch Cart.`);
      });
  }, []);

  return (
    <div className="App">
      <NavBar />
      <ToastContainer
        position="bottom-right"
        autoClose={1000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        theme="light"
      />
      <Routes>
        <Route
          path="/"
          element={<LoadingHOC Wrapped={HomePage} loading={isLoading} />}
        />
        <Route
          path="/shop"
          element={<LoadingHOC Wrapped={ShopPage} loading={isLoading} />}
        />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/shop/:productId" element={<ProductDetailsPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </div>
  );
}

export default App;

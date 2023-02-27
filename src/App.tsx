import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import { useDispatch } from "react-redux";
import { useAppDispatch } from "./React-Redux/store";

import { HomePage } from "./pages/HomePage";
import { AdminPage } from "./pages/AdminPage";
import { ShopPage } from "./pages/ShopPage";
import { CartPage } from "./pages/CartPage";
import { ProductDetailsPage } from "./pages/ProductDetailsPage";
import NotFoundPage from "./pages/NotFoundPage";
import NavBar from "./components/NavBar/NavBar";
import { LoadingHOC } from "./components/LoadingHigherOrderComponent/LoadingHOC";

import { fetchCart } from "./React-Redux/cartReducer";
import { fetchItems } from "./React-Redux/itemReducer";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App(): JSX.Element {
  const dispatch = useAppDispatch();

  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    dispatch(fetchItems());
    setIsLoading(false);
  }, []);

  useEffect(() => {
    dispatch(fetchCart());
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

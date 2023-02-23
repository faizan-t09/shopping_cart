import React, { useState, useContext, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";

import { HomePage } from "./pages/HomePage";
import { AdminPage } from "./pages/AdminPage";
import { ShopPage } from "./pages/ShopPage";
import { CartPage } from "./pages/CartPage";
import { ProductDetailsPage } from "./pages/ProductDetailsPage";
import NotFoundPage from "./pages/NotFoundPage";
import NavBar from "./components/NavBar/NavBar";
import { LoadingHOC } from "./components/LoadingHigherOrderComponent/LoadingHOC";

import { ShopContext } from "./context/ShopContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App(): JSX.Element {
  const { dispatchItems, dispatchCart } = useContext(ShopContext);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    (async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_MY_API_BASE_URL}/product/getAll`
        );
        const data = await response.json();
        dispatchItems({ type: "Initialize", payload: data });
      } catch (error) {
        toast.error(`Failed to fetch items.`);
      }
      setIsLoading(false);
    })();
  }, []);

  useEffect(() => {
    (async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_MY_API_BASE_URL}/cart`
        );
        const data = await response.json();
        dispatchCart({ type: "Initialize", payload: data });
      } catch (error) {
        toast.error(`Failed to fetch Cart.`);
      }
    })();
  }, []);

  return (
    <div className="App">
      <NavBar />
      <ToastContainer
        position="bottom-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
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

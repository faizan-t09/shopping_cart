import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App";
import { ShopContextProvider } from "./context/ShopContext";
import ErrorHandler from "src/components/ErrorBoundary/ErrorHandler";
import { ErrorBoundary } from "react-error-boundary";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <BrowserRouter>
    <ErrorBoundary FallbackComponent={ErrorHandler}>
      <ShopContextProvider>
        <App />
      </ShopContextProvider>
    </ErrorBoundary>
  </BrowserRouter>
);

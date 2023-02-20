import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App";
import ErrorHandler from "src/components/ErrorBoundary/ErrorHandler";
import { ErrorBoundary } from "react-error-boundary";
import { Provider } from "react-redux";
import rootStore from "./React-Redux/store";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <BrowserRouter>
    <Provider store={rootStore}>
      <ErrorBoundary FallbackComponent={ErrorHandler}>
          <App />
      </ErrorBoundary>
    </Provider>
  </BrowserRouter>
);

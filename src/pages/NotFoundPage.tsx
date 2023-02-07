import React from "react";
import { useNavigate } from "react-router-dom";

const NotFoundPage = () => {
  const navigate = useNavigate();
  return (
    <div
      style={{
        color: "red",
        background: "rgb(255,0,0,0.3)",
        height: "85vh",
        margin: "1em",
        borderRadius: "0.3em",
      }}
    >
      <h1 style={{ paddingTop: "35vh", fontSize: "4em" }}>404</h1>
      <h1>Page Not Found</h1>
      <button
        onClick={() => {
          navigate(-2);
        }}
      >
        Go Back
      </button>
    </div>
  );
};

export default NotFoundPage;

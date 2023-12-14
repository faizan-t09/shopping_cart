import React from "react";
import { NavLink } from "react-router-dom";

export const Header: React.FC = () => {
  return (
    <div>
      <header className="App-header">
        Welcome
        <NavLink to="/admin">
          <button style={{fontSize:"0.28em",padding:"0.4em",borderRadius:"1em"}}>Add new Item</button>
        </NavLink>
      </header>
    </div>
  );
};

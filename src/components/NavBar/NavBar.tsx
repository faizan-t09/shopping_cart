import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { ShopContext } from "../../context/ShopContext";

const NavBar = () => {
  const { del, dispatchDel } = useContext(ShopContext);
  return (
    <div className="nav-container">
      <div className="nav-title">Shopping Cart</div>
      <ul className="nav-link-container">
        <div className="nav-link">
          <label>Delete</label>
          <input
            type="checkbox"
            onChange={() => {
              dispatchDel({ type: "Toggle" });
            }}
            checked={del}
          ></input>
        </div>
        <NavLink to="/">
          <li className="nav-link">Home</li>
        </NavLink>
        <NavLink to="/admin">
          <li className="nav-link">Admin</li>
        </NavLink>
        <NavLink to="/shop">
          <li className="nav-link">Shop</li>
        </NavLink>
        <NavLink to="/cart">
          <li className="nav-link">Cart</li>
        </NavLink>
      </ul>
    </div>
  );
};

export default NavBar;

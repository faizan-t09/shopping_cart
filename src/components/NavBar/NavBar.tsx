import React from "react";
import { NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { rootStateType } from "../../React-Redux/rootReducer";
import { delActions } from "src/React-Redux/toggleDeleteReducer";

const NavBar = () => {
  const dispatch = useDispatch();
  const del = useSelector((state: rootStateType) => state.del);
  return (
    <div className="nav-container">
      <div className="nav-title">Shopping Cart</div>
      <ul className="nav-link-container">
        <div className="nav-link">
          <label>Delete</label>
          <input
            type="checkbox"
            onChange={() => {
              dispatch(delActions.toggleDelete());
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

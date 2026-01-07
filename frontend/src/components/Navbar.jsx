// frontend/src/components/Navbar.jsx

import React from "react";
import { NavLink } from "react-router-dom";
import "../styles/navbar.css";

function Navbar() {
  return (
    <nav>
      <div id="navbar">
        <NavLink to="/">MySite</NavLink>

        <ul>
          {/* Home */}
          <li>
            <NavLink to="/">Home</NavLink>
          </li>

          {/* About */}
          <li>
            <NavLink to="/about">About</NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;

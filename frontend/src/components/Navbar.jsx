// frontend/src/components/Navbar.jsx

import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import "../styles/navbar.css";

import westmecLogo from "../public/west-mec-logo.png";

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <nav>
      <div id="navbar">
        <NavLink to="/" id="logoHead" onClick={closeMenu}>
          <img src={westmecLogo} id="logo" alt="West-MEC Logo" />
          <span className="logo-text">West-MEC Lost and Found</span>
        </NavLink>

        {/* Hamburger Menu Button */}
        <button
          className={`hamburger ${isMenuOpen ? "open" : ""}`}
          onClick={toggleMenu}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        <ul className={isMenuOpen ? "open" : ""}>
          <li>
            <NavLink to="/" onClick={closeMenu}>
              Home
            </NavLink>
          </li>

          <li>
            <NavLink to="/about" onClick={closeMenu}>
              About
            </NavLink>
          </li>

          <li>
            <NavLink to="/items" onClick={closeMenu}>
              Items
            </NavLink>
          </li>

          <li>
            <NavLink to="/submit" onClick={closeMenu}>
              Submit
            </NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;

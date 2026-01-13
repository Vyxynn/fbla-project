// frontend/src/components/AdminNavbar.jsx

import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { logout } from "../utils/auth.js";
import "../styles/adminNavbar.css";

function AdminNavbar() {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = () => {
    if (confirm("Are you sure you would like to logout?")) {
      logout();
      navigate("/admin");
    }
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <>
      {/* Hamburger Menu Button (Mobile Only) */}
      <button
        className={`admin-hamburger ${isMenuOpen ? "open" : ""}`}
        onClick={toggleMenu}
      >
        <span></span>
        <span></span>
        <span></span>
      </button>

      {/* Sidebar */}
      <aside id="admin-navbar" className={isMenuOpen ? "open" : ""}>
        <h2>Admin Panel</h2>

        <nav>
          <ul id="admin-navbar-list">
            <li>
              <NavLink
                to="/admin/home"
                className={({ isActive }) => (isActive ? "active" : "")}
                onClick={closeMenu}
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/admin/submissions"
                className={({ isActive }) => (isActive ? "active" : "")}
                onClick={closeMenu}
              >
                Submissions
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/admin/items"
                className={({ isActive }) => (isActive ? "active" : "")}
                onClick={closeMenu}
              >
                Items
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/admin/commentsSub"
                className={({ isActive }) => (isActive ? "active" : "")}
                onClick={closeMenu}
              >
                Comments
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/admin/comments"
                className={({ isActive }) => (isActive ? "active" : "")}
                onClick={closeMenu}
              >
                Approved Comments
              </NavLink>
            </li>
          </ul>
        </nav>

        <button onClick={handleLogout} id="admin-logout-button">
          Logout
        </button>
      </aside>
    </>
  );
}

export default AdminNavbar;

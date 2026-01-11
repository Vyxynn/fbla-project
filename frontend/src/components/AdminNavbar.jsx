// frontend/src/components/AdminNavbar.jsx

import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { logout } from "../utils/auth.js";

function AdminNavbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/admin");
  };

  return (
    <aside
      style={{ width: "250px", backgroundColor: "#2c3e50", padding: "1rem" }}
    >
      <h2 style={{ color: "#ecf0f1", marginBottom: "2rem" }}>Admin Panel</h2>

      <nav>
        <ul style={{ listStyle: "none", padding: 0 }}>
          <li style={{ marginBottom: "1rem" }}>
            <NavLink
              to="/admin/home"
              style={({ isActive }) => ({
                color: isActive ? "#ffdd57" : "#ecf0f1",
                textDecoration: "none",
                display: "block",
                padding: "0.5rem",
              })}
            >
              Home
            </NavLink>
          </li>
          <li style={{ marginBottom: "1rem" }}>
            <NavLink
              to="/admin/submissions"
              style={({ isActive }) => ({
                color: isActive ? "#ffdd57" : "#ecf0f1",
                textDecoration: "none",
                display: "block",
                padding: "0.5rem",
              })}
            >
              Submissions
            </NavLink>
          </li>
          <li style={{ marginBottom: "1rem" }}>
            <NavLink
              to="/admin/items"
              style={({ isActive }) => ({
                color: isActive ? "#ffdd57" : "#ecf0f1",
                textDecoration: "none",
                display: "block",
                padding: "0.5rem",
              })}
            >
              Items
            </NavLink>
          </li>
        </ul>
      </nav>

      <button
        onClick={handleLogout}
        style={{
          marginTop: "2rem",
          padding: "0.5rem 1rem",
          backgroundColor: "#e74c3c",
          color: "#ffffff",
          border: "none",
          borderRadius: "4px",
          cursor: "pointer",
        }}
      >
        Logout
      </button>
    </aside>
  );
}

export default AdminNavbar;

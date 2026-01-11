// frontend/src/AdminApp.jsx

import React from "react";
import { Routes, Route, NavLink } from "react-router-dom";

import AdminNavbar from "../components/AdminNavbar.jsx";
import AdminHome from "./AdminHome.jsx";
import AdminSubmissions from "./AdminSubmissions.jsx";
import AdminItems from "./AdminItems.jsx";

function AdminApp() {


  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      {/* Sidebar */}
      <AdminNavbar />

      {/* Main Content */}
      <main style={{ flex: 1, padding: "2rem" }}>
        <Routes>
          <Route path="/home" element={<AdminHome />} />
          <Route path="/submissions" element={<AdminSubmissions />} />
          <Route path="/items" element={<AdminItems />} />
        </Routes>
      </main>
    </div>
  );
}

export default AdminApp;

// frontend/src/App.jsx

import React from "react";
import { Routes, Route } from "react-router-dom"; // <-- NEW
import Navbar from "./components/Navbar.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";

// Page components
import Home from "./pages/Home.jsx";
import About from "./pages/About.jsx";
import Items from "./pages/Items.jsx";
import Submit from "./pages/Submit.jsx";
import Admin from "./pages/Admin.jsx";
import AdminApp from "./pages/AdminApp.jsx";

function App() {
  return (
    <>
      <Navbar />

      {/* Public Routes */}
      <main className="container mt-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/items" element={<Items />} />
          <Route path="/submit" element={<Submit />} />
          <Route path="/admin" element={<Admin />} />

          <Route
            path="*"
            element={
              <section className="mt-4">
                <h2>Page Not Found</h2>
                <p>The page you’re looking for doesn’t exist.</p>
              </section>
            }
          />

          {/* Protected Routes */}
          <Route
            path="admin/*"
            element={
              <ProtectedRoute>
                <AdminApp />
              </ProtectedRoute>
            }
          />
        </Routes>
      </main>
    </>
  );
}

export default App;

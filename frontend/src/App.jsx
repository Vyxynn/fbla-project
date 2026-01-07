// frontend/src/App.jsx

import React from "react";
import { Routes, Route } from "react-router-dom"; // <-- NEW
import Navbar from "./components/Navbar.jsx";

// Page components
import Home from "./pages/Home.jsx";
import About from "./pages/About.jsx";

function App() {
  return (
    <>
      <Navbar />

      {/* Main content area */}
      <main className="container mt-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />

          <Route
            path="*"
            element={
              <section className="mt-4">
                <h2>Page Not Found</h2>
                <p>The page you’re looking for doesn’t exist.</p>
              </section>
            }
          />
        </Routes>
      </main>
    </>
  );
}

export default App;

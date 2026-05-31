// src/App.jsx
// ─────────────────────────────────────────────────────────────
// PURPOSE: Root component — sets up page routing
//
// WHAT IS ROUTING?
//  In traditional websites, going to /about loads a new HTML page.
//  In React SPAs (Single Page Apps), no new page loads.
//  React Router intercepts URL changes and swaps components.
//
//  / → Dashboard (main page)
//  * → NotFound (any other URL → 404 page)
// ─────────────────────────────────────────────────────────────

import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Dashboard from "./pages/Dashboard";
import NotFound from "./pages/NotFound";

const App = () => {
  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      {/* Navbar appears on every page */}
      <Navbar />

      {/* Main content area */}
      <main style={{ flex: 1 }}>
        <Routes>
          {/* Route: exact path "/" → show Dashboard */}
          <Route path="/" element={<Dashboard />} />

          {/* Route: anything else → show 404 */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
    </div>
  );
};

export default App;

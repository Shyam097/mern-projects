// src/main.jsx
// ─────────────────────────────────────────────────────────────
// PURPOSE: The very first JavaScript file that runs in the browser
//
// WHAT IS REACT?
//  React is a JavaScript library for building user interfaces.
//  Instead of manipulating HTML directly, you write "components"
//  (reusable UI pieces) and React updates the DOM efficiently.
//
// ReactDOM.createRoot() → Finds the <div id="root"> in index.html
//                       → Tells React to take control of it
// .render(<App />) → Injects our <App> component into that div
// ─────────────────────────────────────────────────────────────

import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom"; // Enables page routing
import App from "./App.jsx";
import "./index.css"; // Global styles
import { ExpenseProvider } from "./context/ExpenseContext.jsx"; // Global state

// Find the <div id="root"> and mount our React app into it
ReactDOM.createRoot(document.getElementById("root")).render(
  // StrictMode: shows extra warnings during development (disabled in prod)
  <React.StrictMode>
    {/* BrowserRouter: enables URL-based navigation (/dashboard, /about etc.) */}
    <BrowserRouter>
      {/* ExpenseProvider: makes expense data available to ALL child components */}
      <ExpenseProvider>
        <App />
      </ExpenseProvider>
    </BrowserRouter>
  </React.StrictMode>
);

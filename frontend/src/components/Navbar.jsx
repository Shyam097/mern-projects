// src/components/Navbar.jsx
// ─────────────────────────────────────────────────────────────
// PURPOSE: Top navigation bar shown on every page
//
// WHAT IS A COMPONENT?
//  A reusable, self-contained piece of UI.
//  Components are JavaScript functions that return JSX (HTML-like syntax).
//  JSX gets compiled to React.createElement() calls by Vite.
// ─────────────────────────────────────────────────────────────

import React from "react";
import { Link } from "react-router-dom";
import { useExpenses } from "../context/ExpenseContext";

const Navbar = () => {
  const { grandTotal } = useExpenses();

  return (
    <nav
      style={{
        background: "rgba(13,13,13,0.85)",
        backdropFilter: "blur(12px)",
        borderBottom: "1px solid var(--border)",
        position: "sticky",
        top: 0,
        zIndex: 100,
        padding: "0 24px",
      }}
    >
      <div
        className="container"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          height: 60,
        }}
      >
        {/* Logo */}
        <Link
          to="/"
          style={{
            textDecoration: "none",
            display: "flex",
            alignItems: "center",
            gap: 10,
          }}
        >
          <span style={{ fontSize: "1.4rem" }}>💸</span>
          <span
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 800,
              fontSize: "1.1rem",
              color: "var(--text-primary)",
              letterSpacing: "-0.02em",
            }}
          >
            Expense<span style={{ color: "var(--accent)" }}>Tracker</span>
          </span>
        </Link>

        {/* Total Spending Badge */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            background: "var(--bg-card)",
            border: "1px solid var(--border)",
            borderRadius: 100,
            padding: "6px 16px",
            fontSize: "0.85rem",
          }}
        >
          <span style={{ color: "var(--text-secondary)" }}>Total Spent</span>
          <span
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 700,
              color: "var(--accent)",
            }}
          >
            ₹{grandTotal.toLocaleString("en-IN", { minimumFractionDigits: 2 })}
          </span>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

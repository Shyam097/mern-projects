// src/pages/NotFound.jsx
import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => (
  <div
    style={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      minHeight: "60vh",
      textAlign: "center",
      padding: 24,
    }}
  >
    <span style={{ fontSize: "4rem" }}>🕳️</span>
    <h1
      style={{
        fontFamily: "var(--font-display)",
        fontSize: "4rem",
        fontWeight: 800,
        color: "var(--accent)",
        marginTop: 16,
      }}
    >
      404
    </h1>
    <p style={{ color: "var(--text-secondary)", marginTop: 8 }}>
      This page doesn't exist.
    </p>
    <Link to="/" className="btn btn-primary" style={{ marginTop: 24 }}>
      ← Back to Dashboard
    </Link>
  </div>
);

export default NotFound;

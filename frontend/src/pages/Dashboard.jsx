// src/pages/Dashboard.jsx
// PURPOSE: Main page — puts all components together in a layout

import React from "react";
import ExpenseForm from "../components/ExpenseForm";
import ExpenseList from "../components/ExpenseList";
import Summary from "../components/Summary";
import { useExpenses } from "../context/ExpenseContext";

const Dashboard = () => {
  const { grandTotal, expenses } = useExpenses();

  return (
    <div
      className="container"
      style={{ padding: "32px 24px", maxWidth: 1100, margin: "0 auto" }}
    >
      {/* Page Header */}
      <div style={{ marginBottom: 32 }}>
        <h1
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(1.8rem, 4vw, 2.8rem)",
            fontWeight: 800,
            letterSpacing: "-0.03em",
            lineHeight: 1.1,
          }}
        >
          Your{" "}
          <span style={{ color: "var(--accent)" }}>Expenses</span>
        </h1>
        <p style={{ color: "var(--text-secondary)", marginTop: 8, fontSize: "0.95rem" }}>
          {expenses.length === 0
            ? "Start tracking your spending below."
            : `${expenses.length} expense${expenses.length > 1 ? "s" : ""} tracked — ₹${grandTotal.toLocaleString("en-IN")} total.`}
        </p>
      </div>

      {/* Main 2-column grid */}
      {/*
        CSS Grid: divides page into columns.
        On wide screens: [left sidebar 360px] [right main area fills rest]
        On narrow screens: stacks vertically (1fr)
      */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "clamp(280px, 33%, 380px) 1fr",
          gap: 24,
          alignItems: "start",
        }}
      >
        {/* Left Column: Form + Summary */}
        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <ExpenseForm />
          <Summary />
        </div>

        {/* Right Column: Expense List */}
        <ExpenseList />
      </div>
    </div>
  );
};

export default Dashboard;

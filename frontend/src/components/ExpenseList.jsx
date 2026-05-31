// src/components/ExpenseList.jsx
// PURPOSE: Display all expenses with search + category filter

import React, { useState, useMemo } from "react";
import { useExpenses } from "../context/ExpenseContext";
import ExpenseItem from "./ExpenseItem";

const CATEGORIES = ["All", "Food", "Transport", "Shopping", "Entertainment", "Health", "Education", "Rent", "Other"];

const ExpenseList = () => {
  const { expenses, loading, error } = useExpenses();
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");

  // useMemo: recompute filtered list only when expenses/search/filter change
  // (Optimisation — avoids recomputing on every render)
  const filtered = useMemo(() => {
    return expenses.filter((e) => {
      const matchesSearch =
        e.title.toLowerCase().includes(search.toLowerCase()) ||
        e.description?.toLowerCase().includes(search.toLowerCase());
      const matchesCategory = filter === "All" || e.category === filter;
      return matchesSearch && matchesCategory;
    });
  }, [expenses, search, filter]);

  if (loading) {
    return (
      <div className="card">
        <p style={{ color: "var(--text-muted)", textAlign: "center" }}>
          Loading expenses...
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="card">
        <p style={{ color: "var(--danger)", textAlign: "center" }}>
          ⚠️ {error}
        </p>
      </div>
    );
  }

  return (
    <div className="card fade-in" style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h2
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "1rem",
            fontWeight: 700,
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            color: "var(--text-secondary)",
          }}
        >
          All Expenses
        </h2>
        <span style={{ fontSize: "0.82rem", color: "var(--text-muted)" }}>
          {filtered.length} of {expenses.length}
        </span>
      </div>

      {/* Search bar */}
      <input
        type="text"
        placeholder="🔍 Search expenses..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{ marginBottom: 0 }}
      />

      {/* Category filter pills */}
      <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            style={{
              padding: "4px 12px",
              borderRadius: 100,
              border: "1px solid",
              borderColor: filter === cat ? "var(--accent)" : "var(--border)",
              background: filter === cat ? "rgba(184,245,103,0.12)" : "transparent",
              color: filter === cat ? "var(--accent)" : "var(--text-secondary)",
              fontSize: "0.8rem",
              cursor: "pointer",
              transition: "all 0.15s",
              fontFamily: "var(--font-body)",
            }}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Expense items */}
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {filtered.length === 0 ? (
          <div style={{ textAlign: "center", padding: "40px 0" }}>
            <span style={{ fontSize: "2rem" }}>🕳️</span>
            <p style={{ color: "var(--text-muted)", marginTop: 12 }}>
              {expenses.length === 0
                ? "No expenses yet — add your first one!"
                : "No expenses match your filter."}
            </p>
          </div>
        ) : (
          filtered.map((expense) => (
            <ExpenseItem key={expense._id} expense={expense} />
          ))
        )}
      </div>
    </div>
  );
};

export default ExpenseList;

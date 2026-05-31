// src/components/ExpenseForm.jsx
// ─────────────────────────────────────────────────────────────
// PURPOSE: Form to add a new expense
//
// CONTROLLED COMPONENTS:
//  In React, form inputs are "controlled" by state.
//  useState stores the current value.
//  onChange updates the state on every keystroke.
//  The input's value prop always reflects the state.
//  This is different from plain HTML where inputs manage themselves.
// ─────────────────────────────────────────────────────────────

import React, { useState } from "react";
import { useExpenses } from "../context/ExpenseContext";

const CATEGORIES = [
  "Food", "Transport", "Shopping", "Entertainment",
  "Health", "Education", "Rent", "Other",
];

// Initial empty form state
const INITIAL_FORM = {
  title: "",
  amount: "",
  category: "",
  description: "",
  date: new Date().toISOString().split("T")[0], // Today's date in YYYY-MM-DD
};

const ExpenseForm = () => {
  // useState hook: [currentValue, setterFunction]
  const [form, setForm] = useState(INITIAL_FORM);
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState(null); // { type: "success"|"error", text }

  const { handleAddExpense } = useExpenses();

  // Handle any input change — updates the correct field in form state
  const handleChange = (e) => {
    const { name, value } = e.target;
    // Spread operator: copy all existing fields, then overwrite the changed one
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent browser's default form submit (page reload)

    // Basic validation
    if (!form.title || !form.amount || !form.category) {
      setMessage({ type: "error", text: "Please fill in all required fields." });
      return;
    }

    setSubmitting(true);
    setMessage(null);

    const result = await handleAddExpense({
      ...form,
      amount: parseFloat(form.amount), // Convert string "100" → number 100
    });

    setSubmitting(false);

    if (result.success) {
      setForm(INITIAL_FORM); // Clear the form
      setMessage({ type: "success", text: "Expense added! 🎉" });
      setTimeout(() => setMessage(null), 3000); // Hide message after 3s
    } else {
      setMessage({ type: "error", text: result.message });
    }
  };

  return (
    <div className="card fade-in">
      <h2
        style={{
          fontFamily: "var(--font-display)",
          fontSize: "1rem",
          fontWeight: 700,
          letterSpacing: "0.1em",
          textTransform: "uppercase",
          color: "var(--text-secondary)",
          marginBottom: 20,
        }}
      >
        Add Expense
      </h2>

      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 14 }}>
        {/* Title */}
        <div className="form-group">
          <label htmlFor="title">Title *</label>
          <input
            id="title"
            name="title"
            type="text"
            value={form.title}
            onChange={handleChange}
            placeholder="e.g. Lunch at canteen"
            required
          />
        </div>

        {/* Amount + Category side by side */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
          <div className="form-group">
            <label htmlFor="amount">Amount (₹) *</label>
            <input
              id="amount"
              name="amount"
              type="number"
              value={form.amount}
              onChange={handleChange}
              placeholder="0.00"
              min="0.01"
              step="0.01"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="category">Category *</label>
            <select
              id="category"
              name="category"
              value={form.category}
              onChange={handleChange}
              required
            >
              <option value="">Select...</option>
              {CATEGORIES.map((cat) => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Date */}
        <div className="form-group">
          <label htmlFor="date">Date</label>
          <input
            id="date"
            name="date"
            type="date"
            value={form.date}
            onChange={handleChange}
          />
        </div>

        {/* Description (optional) */}
        <div className="form-group">
          <label htmlFor="description">Note (optional)</label>
          <input
            id="description"
            name="description"
            type="text"
            value={form.description}
            onChange={handleChange}
            placeholder="Any extra details..."
          />
        </div>

        {/* Submit button */}
        <button
          type="submit"
          className="btn btn-primary"
          disabled={submitting}
          style={{ marginTop: 4, justifyContent: "center" }}
        >
          {submitting ? "Adding..." : "+ Add Expense"}
        </button>

        {/* Success / error message */}
        {message && (
          <div
            style={{
              padding: "10px 14px",
              borderRadius: "var(--radius-sm)",
              fontSize: "0.87rem",
              background:
                message.type === "success"
                  ? "rgba(184,245,103,0.1)"
                  : "rgba(255,95,95,0.1)",
              color:
                message.type === "success"
                  ? "var(--accent)"
                  : "var(--danger)",
              border: `1px solid ${
                message.type === "success" ? "rgba(184,245,103,0.3)" : "rgba(255,95,95,0.3)"
              }`,
            }}
          >
            {message.text}
          </div>
        )}
      </form>
    </div>
  );
};

export default ExpenseForm;

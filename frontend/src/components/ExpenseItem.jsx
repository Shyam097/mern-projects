// src/components/ExpenseItem.jsx
// PURPOSE: Display a single expense as a card with delete button

import React, { useState } from "react";
import { useExpenses } from "../context/ExpenseContext";

// Category → emoji mapping for visual flair
const CATEGORY_EMOJI = {
  Food: "🍔",
  Transport: "🚌",
  Shopping: "🛍️",
  Entertainment: "🎬",
  Health: "💊",
  Education: "📚",
  Rent: "🏠",
  Other: "📦",
};

// Category → colour mapping for badge
const CATEGORY_COLOUR = {
  Food: "#fb923c",
  Transport: "#60a5fa",
  Shopping: "#f472b6",
  Entertainment: "#a78bfa",
  Health: "#34d399",
  Education: "#facc15",
  Rent: "#f87171",
  Other: "#94a3b8",
};

const ExpenseItem = ({ expense }) => {
  const { handleDeleteExpense } = useExpenses();
  const [deleting, setDeleting] = useState(false);

  const handleDelete = async () => {
    if (!window.confirm(`Delete "${expense.title}"?`)) return;
    setDeleting(true);
    await handleDeleteExpense(expense._id);
    // Component unmounts after deletion, so no need to setDeleting(false)
  };

  // Format date nicely: "15 Jan 2024"
  const formattedDate = new Date(expense.date).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  const colour = CATEGORY_COLOUR[expense.category] || "#94a3b8";

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 14,
        padding: "14px 16px",
        background: "var(--bg-card)",
        border: "1px solid var(--border)",
        borderRadius: "var(--radius-md)",
        transition: "border-color 0.2s, background 0.2s",
        opacity: deleting ? 0.5 : 1,
        animation: "slideIn 0.3s ease both",
      }}
      onMouseEnter={(e) => (e.currentTarget.style.borderColor = "var(--border-light)")}
      onMouseLeave={(e) => (e.currentTarget.style.borderColor = "var(--border)")}
    >
      {/* Emoji icon */}
      <span
        style={{
          fontSize: "1.4rem",
          width: 40,
          height: 40,
          background: "var(--bg-hover)",
          borderRadius: "var(--radius-sm)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
        }}
      >
        {CATEGORY_EMOJI[expense.category] || "💰"}
      </span>

      {/* Title + metadata */}
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontWeight: 500, fontSize: "0.95rem", truncate: true }}>
          {expense.title}
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 3 }}>
          {/* Category badge */}
          <span
            style={{
              fontSize: "0.72rem",
              fontWeight: 600,
              padding: "2px 8px",
              borderRadius: 100,
              background: `${colour}22`,
              color: colour,
            }}
          >
            {expense.category}
          </span>
          <span style={{ fontSize: "0.78rem", color: "var(--text-muted)" }}>
            {formattedDate}
          </span>
          {expense.description && (
            <span
              style={{
                fontSize: "0.78rem",
                color: "var(--text-muted)",
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
                maxWidth: 120,
              }}
            >
              · {expense.description}
            </span>
          )}
        </div>
      </div>

      {/* Amount */}
      <span
        style={{
          fontFamily: "var(--font-display)",
          fontWeight: 700,
          fontSize: "1rem",
          color: "var(--text-primary)",
          flexShrink: 0,
        }}
      >
        ₹{expense.amount.toLocaleString("en-IN", { minimumFractionDigits: 2 })}
      </span>

      {/* Delete button */}
      <button
        onClick={handleDelete}
        disabled={deleting}
        title="Delete expense"
        style={{
          background: "none",
          border: "none",
          cursor: "pointer",
          padding: "4px 8px",
          borderRadius: "var(--radius-sm)",
          color: "var(--text-muted)",
          fontSize: "1rem",
          transition: "color 0.2s",
          flexShrink: 0,
        }}
        onMouseEnter={(e) => (e.currentTarget.style.color = "var(--danger)")}
        onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-muted)")}
      >
        ✕
      </button>
    </div>
  );
};

export default ExpenseItem;

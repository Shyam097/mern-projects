// src/components/Summary.jsx
// ─────────────────────────────────────────────────────────────
// PURPOSE: Show category-wise spending breakdown with a chart
//
// RECHARTS:
//  A charting library built for React.
//  PieChart, BarChart, LineChart etc. are all React components.
// ─────────────────────────────────────────────────────────────

import React from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { useExpenses } from "../context/ExpenseContext";

// Colour palette for each category slice
const COLOURS = [
  "#b8f567", // accent green
  "#60a5fa", // blue
  "#f472b6", // pink
  "#fb923c", // orange
  "#a78bfa", // purple
  "#34d399", // teal
  "#facc15", // yellow
  "#f87171", // red
];

const Summary = () => {
  const { summary, grandTotal, loading } = useExpenses();

  if (loading) {
    return (
      <div className="card">
        <p style={{ color: "var(--text-muted)", textAlign: "center" }}>
          Loading summary...
        </p>
      </div>
    );
  }

  if (!summary || summary.length === 0) {
    return (
      <div className="card" style={{ textAlign: "center", padding: "40px 24px" }}>
        <span style={{ fontSize: "2rem" }}>📊</span>
        <p style={{ color: "var(--text-secondary)", marginTop: 12 }}>
          No expenses yet. Add some to see your summary!
        </p>
      </div>
    );
  }

  // Format data for Recharts
  const chartData = summary.map((item) => ({
    name: item._id,
    value: item.total,
    count: item.count,
  }));

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
        Spending Breakdown
      </h2>

      {/* Pie Chart */}
      <ResponsiveContainer width="100%" height={220}>
        <PieChart>
          <Pie
            data={chartData}
            cx="50%"
            cy="50%"
            innerRadius={55}   // Donut shape (hollow centre)
            outerRadius={85}
            paddingAngle={3}
            dataKey="value"
          >
            {chartData.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLOURS[index % COLOURS.length]}
              />
            ))}
          </Pie>
          <Tooltip
            formatter={(value) =>
              `₹${value.toLocaleString("en-IN", { minimumFractionDigits: 2 })}`
            }
            contentStyle={{
              background: "var(--bg-card)",
              border: "1px solid var(--border)",
              borderRadius: 8,
              color: "var(--text-primary)",
              fontSize: "0.85rem",
            }}
          />
        </PieChart>
      </ResponsiveContainer>

      {/* Category breakdown list */}
      <div style={{ marginTop: 16, display: "flex", flexDirection: "column", gap: 10 }}>
        {summary.map((item, index) => {
          const pct = ((item.total / grandTotal) * 100).toFixed(1);
          return (
            <div key={item._id} style={{ display: "flex", alignItems: "center", gap: 10 }}>
              {/* Color dot */}
              <span
                style={{
                  width: 10,
                  height: 10,
                  borderRadius: "50%",
                  background: COLOURS[index % COLOURS.length],
                  flexShrink: 0,
                }}
              />

              {/* Category name */}
              <span style={{ flex: 1, fontSize: "0.88rem", color: "var(--text-primary)" }}>
                {item._id}
              </span>

              {/* Count */}
              <span style={{ fontSize: "0.78rem", color: "var(--text-muted)" }}>
                {item.count} item{item.count > 1 ? "s" : ""}
              </span>

              {/* Amount */}
              <span style={{ fontSize: "0.88rem", fontWeight: 600, color: "var(--text-primary)" }}>
                ₹{item.total.toLocaleString("en-IN")}
              </span>

              {/* Percent bar */}
              <div
                style={{
                  width: 60,
                  height: 4,
                  background: "var(--bg-hover)",
                  borderRadius: 2,
                  overflow: "hidden",
                }}
              >
                <div
                  style={{
                    width: `${pct}%`,
                    height: "100%",
                    background: COLOURS[index % COLOURS.length],
                    borderRadius: 2,
                  }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Summary;

// server.js
// ─────────────────────────────────────────────────────────────
// PURPOSE: The main entry point of our backend server
//
// WHAT HAPPENS HERE:
//  1. Load environment variables from .env
//  2. Create the Express app
//  3. Add middleware (CORS, JSON parsing)
//  4. Connect to MongoDB
//  5. Register routes (API endpoints)
//  6. Start listening on a port
//
// HOW A WEB SERVER WORKS:
//  Your computer has 65535 "ports" — like doors on a building.
//  We tell our server to listen on port 5000.
//  When a request arrives at port 5000, Express handles it.
//  The frontend (on port 5173) sends requests to port 5000.
// ─────────────────────────────────────────────────────────────

// dotenv loads variables from .env file into process.env
require("dotenv").config();

const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const expenseRoutes = require("./routes/expenses");
const errorHandler = require("./middleware/errorHandler");

// ── Create Express App ────────────────────────────────────────
const app = express();

// ── Middleware ────────────────────────────────────────────────

// CORS (Cross-Origin Resource Sharing):
//   Browsers block requests from one domain to another by default.
//   This middleware allows our frontend (localhost:5173 or vercel.app)
//   to call our backend (localhost:5000 or render.com).
app.use(
  cors({
    origin: [
      "http://localhost:5173",         // Local dev frontend
      process.env.FRONTEND_URL,        // Production frontend URL (set in .env)
    ].filter(Boolean), // Remove undefined values
    credentials: true,
  })
);

// Parse incoming JSON request bodies
// Without this, req.body would be undefined
app.use(express.json());

// Parse URL-encoded data (form submissions)
app.use(express.urlencoded({ extended: true }));

// ── Connect to Database ───────────────────────────────────────
connectDB();

// ── Routes ───────────────────────────────────────────────────
// All URLs starting with /api/expenses → go to expenseRoutes
app.use("/api/expenses", expenseRoutes);

// Health check endpoint — useful to verify server is running
app.get("/", (req, res) => {
  res.json({
    message: "💸 Expense Tracker API is running!",
    version: "1.0.0",
    endpoints: {
      expenses: "/api/expenses",
      summary: "/api/expenses/summary",
    },
  });
});

// 404 handler — for routes that don't exist
app.use("*", (req, res) => {
  res.status(404).json({ success: false, message: `Route ${req.originalUrl} not found` });
});

// ── Error Handler ─────────────────────────────────────────────
// Must be LAST — Express knows it's an error handler by 4 params
app.use(errorHandler);

// ── Start Server ──────────────────────────────────────────────
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log(`📍 Environment: ${process.env.NODE_ENV}`);
});

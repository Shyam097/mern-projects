// routes/expenses.js
// ─────────────────────────────────────────────────────────────
// PURPOSE: Define all API endpoints (URLs) for expenses
//
// WHAT IS AN API ENDPOINT?
//  A URL that the frontend calls to get/send data.
//  Like ordering food at a counter — you tell the counter
//  (API) what you want, and it brings it from the kitchen (DB).
//
// REST API — 4 operations (CRUD):
//  C → Create  → POST   /api/expenses       (add new expense)
//  R → Read    → GET    /api/expenses       (get all expenses)
//  U → Update  → PUT    /api/expenses/:id   (edit one expense)
//  D → Delete  → DELETE /api/expenses/:id   (remove one expense)
//
// HTTP Methods explained:
//  GET    → Fetch data (safe, doesn't change anything)
//  POST   → Send new data to server
//  PUT    → Update existing data
//  DELETE → Remove data
// ─────────────────────────────────────────────────────────────

const express = require("express");
const router = express.Router(); // Mini-app for this group of routes
const Expense = require("../models/Expense");

// ── GET /api/expenses ─────────────────────────────────────────
// Fetch ALL expenses, sorted newest first
router.get("/", async (req, res) => {
  try {
    // Expense.find() → query MongoDB for all documents in "expenses" collection
    // .sort({ date: -1 }) → -1 = descending (newest first)
    const expenses = await Expense.find().sort({ date: -1 });

    res.status(200).json({
      success: true,
      count: expenses.length,
      data: expenses,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// ── GET /api/expenses/summary ─────────────────────────────────
// Get total spending grouped by category
router.get("/summary", async (req, res) => {
  try {
    // MongoDB Aggregation Pipeline — like a data transformation chain
    const summary = await Expense.aggregate([
      {
        $group: {
          _id: "$category",           // Group by category field
          total: { $sum: "$amount" }, // Sum all amounts in that group
          count: { $sum: 1 },         // Count how many expenses
        },
      },
      { $sort: { total: -1 } }, // Sort by highest spending first
    ]);

    // Also calculate grand total
    const grandTotal = await Expense.aggregate([
      { $group: { _id: null, total: { $sum: "$amount" } } },
    ]);

    res.status(200).json({
      success: true,
      data: summary,
      grandTotal: grandTotal[0]?.total || 0,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// ── POST /api/expenses ────────────────────────────────────────
// Create a NEW expense
router.post("/", async (req, res) => {
  try {
    // req.body → the data sent from the frontend (JSON)
    const { title, amount, category, description, date } = req.body;

    // Create a new Expense document using our Model
    const expense = await Expense.create({
      title,
      amount,
      category,
      description,
      date,
    });

    // 201 = "Created" (more specific than 200 = "OK")
    res.status(201).json({
      success: true,
      data: expense,
    });
  } catch (error) {
    // Mongoose validation error (e.g., missing required field)
    if (error.name === "ValidationError") {
      const messages = Object.values(error.errors).map((e) => e.message);
      return res.status(400).json({ success: false, message: messages.join(", ") });
    }
    res.status(500).json({ success: false, message: error.message });
  }
});

// ── PUT /api/expenses/:id ─────────────────────────────────────
// Update an existing expense by its ID
router.put("/:id", async (req, res) => {
  try {
    // :id is a URL parameter — e.g., /api/expenses/64abc123...
    const expense = await Expense.findByIdAndUpdate(
      req.params.id,  // Which document to find
      req.body,       // What to update it with
      {
        new: true,            // Return the UPDATED document (not old)
        runValidators: true,  // Still run schema validation on update
      }
    );

    if (!expense) {
      return res.status(404).json({ success: false, message: "Expense not found" });
    }

    res.status(200).json({ success: true, data: expense });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// ── DELETE /api/expenses/:id ──────────────────────────────────
// Delete one expense by its ID
router.delete("/:id", async (req, res) => {
  try {
    const expense = await Expense.findByIdAndDelete(req.params.id);

    if (!expense) {
      return res.status(404).json({ success: false, message: "Expense not found" });
    }

    res.status(200).json({ success: true, message: "Expense deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;

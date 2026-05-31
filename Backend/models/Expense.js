// models/Expense.js
// ─────────────────────────────────────────────────────────────
// PURPOSE: Define the shape of an "Expense" in MongoDB
//
// WHAT IS A MODEL?
//  Think of it like a form template.
//  Every expense must follow this structure — title, amount,
//  category, date. MongoDB stores them as documents (like JSON).
//
// MONGOOSE SCHEMA:
//  A Schema defines fields and their types/rules.
//  A Model is the class we use to interact with that collection.
// ─────────────────────────────────────────────────────────────

const mongoose = require("mongoose");

// Step 1: Define the schema (the "form template")
const ExpenseSchema = new mongoose.Schema(
  {
    title: {
      type: String,       // Must be text
      required: [true, "Title is required"],  // Can't be empty
      trim: true,         // Remove extra spaces automatically
      maxlength: [100, "Title cannot exceed 100 characters"],
    },

    amount: {
      type: Number,       // Must be a number (rupees)
      required: [true, "Amount is required"],
      min: [0.01, "Amount must be greater than 0"],
    },

    category: {
      type: String,
      required: [true, "Category is required"],
      // Only these values are allowed (dropdown options):
      enum: [
        "Food",
        "Transport",
        "Shopping",
        "Entertainment",
        "Health",
        "Education",
        "Rent",
        "Other",
      ],
    },

    description: {
      type: String,
      trim: true,
      maxlength: [300, "Description too long"],
      default: "",  // Optional field — defaults to empty string
    },

    date: {
      type: Date,
      default: Date.now,  // If not provided, use current date/time
    },
  },
  {
    // timestamps: true → Mongoose auto-adds createdAt & updatedAt fields
    timestamps: true,
  }
);

// Step 2: Create the Model from the Schema
// "Expense" → MongoDB will create a collection called "expenses" (lowercase + plural)
const Expense = mongoose.model("Expense", ExpenseSchema);

module.exports = Expense;

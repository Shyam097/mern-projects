// src/utils/api.js
// ─────────────────────────────────────────────────────────────
// PURPOSE: All API calls to the backend in ONE file
//
// WHY CENTRALISE API CALLS?
//  If the backend URL changes, you update it in ONE place.
//  It also keeps components clean — they just call api.getExpenses()
//  instead of writing fetch() logic everywhere.
//
// AXIOS:
//  A library for making HTTP requests (like fetch() but nicer).
//  Automatically parses JSON, handles errors better, supports
//  request/response interceptors.
//
// BASE URL:
//  In development: Vite proxy forwards /api → localhost:5000
//  In production: Set VITE_API_URL to your Render.com backend URL
// ─────────────────────────────────────────────────────────────

import axios from "axios";

// Create an axios instance with default config
const apiClient = axios.create({
  // import.meta.env.VITE_API_URL → reads from .env file (VITE_ prefix required)
  // Falls back to "/api" for local dev (Vite proxy handles it)
  baseURL: import.meta.env.VITE_API_URL || "/api",
  headers: {
    "Content-Type": "application/json",
  },
});

// ── Response Interceptor ──────────────────────────────────────
// Runs on EVERY response — useful for global error handling
apiClient.interceptors.response.use(
  (response) => response,       // Success: just return it
  (error) => {
    const message =
      error.response?.data?.message || // Backend error message
      error.message ||                 // Axios error message
      "Something went wrong";
    return Promise.reject(new Error(message));
  }
);

// ── API Functions ─────────────────────────────────────────────

// Get all expenses
export const getExpenses = () => apiClient.get("/expenses");

// Get summary (totals by category)
export const getSummary = () => apiClient.get("/expenses/summary");

// Add a new expense
export const addExpense = (expenseData) => apiClient.post("/expenses", expenseData);

// Update an expense
export const updateExpense = (id, expenseData) => apiClient.put(`/expenses/${id}`, expenseData);

// Delete an expense
export const deleteExpense = (id) => apiClient.delete(`/expenses/${id}`);

export default apiClient;

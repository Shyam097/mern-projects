// src/context/ExpenseContext.jsx
// ─────────────────────────────────────────────────────────────
// PURPOSE: Global state management using React Context
//
// THE PROBLEM: "Prop Drilling"
//  Without Context, you'd pass data through EVERY component layer:
//  App → Dashboard → ExpenseList → ExpenseItem (just to delete!)
//  This is messy for deep component trees.
//
// THE SOLUTION: React Context
//  Context is a "global store" — any component can READ from it
//  or DISPATCH actions to it, without prop drilling.
//
// HOW IT WORKS:
//  1. Create a Context (ExpenseContext)
//  2. Create a Provider (ExpenseProvider) that wraps the app
//  3. Any child component can useContext(ExpenseContext) to access data
//
// useReducer:
//  Like useState but for complex state with multiple actions.
//  dispatch({ type: "ADD_EXPENSE", payload: {...} }) → reducer updates state
// ─────────────────────────────────────────────────────────────

import React, { createContext, useContext, useReducer, useEffect, useCallback } from "react";
import { getExpenses, getSummary, addExpense, deleteExpense, updateExpense } from "../utils/api";

// Step 1: Create the Context
const ExpenseContext = createContext();

// Step 2: Define the initial state shape
const initialState = {
  expenses: [],        // Array of expense objects from DB
  summary: [],         // Category totals
  grandTotal: 0,       // Overall total spending
  loading: false,      // Is an API call in progress?
  error: null,         // Error message if something failed
};

// Step 3: Reducer — pure function that returns new state
// Think of it like a switch statement for state changes
const expenseReducer = (state, action) => {
  switch (action.type) {
    case "SET_LOADING":
      return { ...state, loading: action.payload, error: null };

    case "SET_ERROR":
      return { ...state, error: action.payload, loading: false };

    case "SET_EXPENSES":
      return { ...state, expenses: action.payload, loading: false };

    case "SET_SUMMARY":
      return {
        ...state,
        summary: action.payload.data,
        grandTotal: action.payload.grandTotal,
      };

    case "ADD_EXPENSE":
      // Spread existing expenses + add new one at start
      return { ...state, expenses: [action.payload, ...state.expenses] };

    case "DELETE_EXPENSE":
      return {
        ...state,
        expenses: state.expenses.filter((e) => e._id !== action.payload),
      };

    case "UPDATE_EXPENSE":
      return {
        ...state,
        expenses: state.expenses.map((e) =>
          e._id === action.payload._id ? action.payload : e
        ),
      };

    default:
      return state;
  }
};

// Step 4: Create the Provider component
export const ExpenseProvider = ({ children }) => {
  const [state, dispatch] = useReducer(expenseReducer, initialState);

  // Fetch all expenses from backend
  const fetchExpenses = useCallback(async () => {
    dispatch({ type: "SET_LOADING", payload: true });
    try {
      const [expensesRes, summaryRes] = await Promise.all([
        getExpenses(),
        getSummary(),
      ]);
      dispatch({ type: "SET_EXPENSES", payload: expensesRes.data.data });
      dispatch({ type: "SET_SUMMARY", payload: summaryRes.data });
    } catch (err) {
      dispatch({ type: "SET_ERROR", payload: err.message });
    }
  }, []);

  // Add a new expense
  const handleAddExpense = async (expenseData) => {
    try {
      const res = await addExpense(expenseData);
      dispatch({ type: "ADD_EXPENSE", payload: res.data.data });
      // Refresh summary after adding
      const summaryRes = await getSummary();
      dispatch({ type: "SET_SUMMARY", payload: summaryRes.data });
      return { success: true };
    } catch (err) {
      return { success: false, message: err.message };
    }
  };

  // Delete an expense
  const handleDeleteExpense = async (id) => {
    try {
      await deleteExpense(id);
      dispatch({ type: "DELETE_EXPENSE", payload: id });
      const summaryRes = await getSummary();
      dispatch({ type: "SET_SUMMARY", payload: summaryRes.data });
      return { success: true };
    } catch (err) {
      return { success: false, message: err.message };
    }
  };

  // Load expenses on mount (when app first loads)
  useEffect(() => {
    fetchExpenses();
  }, [fetchExpenses]);

  // The value object is what consuming components can access
  const value = {
    ...state,
    fetchExpenses,
    handleAddExpense,
    handleDeleteExpense,
  };

  return (
    <ExpenseContext.Provider value={value}>
      {children}
    </ExpenseContext.Provider>
  );
};

// Step 5: Custom hook — makes it easy to use this context
// Instead of: const { expenses } = useContext(ExpenseContext)
// You write:  const { expenses } = useExpenses()
export const useExpenses = () => {
  const context = useContext(ExpenseContext);
  if (!context) {
    throw new Error("useExpenses must be used inside <ExpenseProvider>");
  }
  return context;
};

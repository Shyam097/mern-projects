// middleware/errorHandler.js
// ─────────────────────────────────────────────────────────────
// PURPOSE: A central place to catch and format all errors
//
// WHAT IS MIDDLEWARE?
//  Middleware is code that runs BETWEEN the request arriving
//  and the response being sent. Like a checkpoint.
//
//  Request → [Middleware 1] → [Middleware 2] → Route Handler → Response
//
//  Express middleware has the signature: (req, res, next)
//  - req  → request object (has URL, body, headers)
//  - res  → response object (use this to send back data)
//  - next → call this to pass to the next middleware
//
// Error middleware has 4 params: (err, req, res, next)
// Express knows it's an error handler because of the 4th param.
// ─────────────────────────────────────────────────────────────

const errorHandler = (err, req, res, next) => {
  // Log error to server console (for debugging)
  console.error("Error:", err.message);

  // Default error values
  let statusCode = err.statusCode || 500;
  let message = err.message || "Internal Server Error";

  // Handle specific MongoDB errors:

  // CastError → invalid MongoDB ID format
  if (err.name === "CastError") {
    statusCode = 400;
    message = "Invalid ID format";
  }

  // Duplicate key error (e.g., unique field already exists)
  if (err.code === 11000) {
    statusCode = 400;
    message = "Duplicate entry — this already exists";
  }

  // ValidationError → Mongoose schema validation failed
  if (err.name === "ValidationError") {
    statusCode = 400;
    message = Object.values(err.errors)
      .map((val) => val.message)
      .join(", ");
  }

  res.status(statusCode).json({
    success: false,
    message,
    // Only show stack trace in development (not in production)
    stack: process.env.NODE_ENV === "development" ? err.stack : undefined,
  });
};

module.exports = errorHandler;

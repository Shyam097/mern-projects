// config/db.js
// ─────────────────────────────────────────────────────────────
// PURPOSE: Connect our Node.js app to MongoDB Atlas (cloud DB)
//
// HOW IT WORKS:
//  1. We import "mongoose" — a library that lets JS talk to MongoDB
//  2. We read the connection string from .env (keeps secrets safe)
//  3. mongoose.connect() opens the connection
//  4. We export this function so server.js can call it at startup
// ─────────────────────────────────────────────────────────────

const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    // mongoose.connect() returns a promise — await waits for it to finish
    const conn = await mongoose.connect(process.env.MONGO_URI);

    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    // If connection fails (wrong password, no internet), log and exit
    console.error(`❌ MongoDB Error: ${error.message}`);
    process.exit(1); // Exit with failure code
  }
};

module.exports = connectDB;

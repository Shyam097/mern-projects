# 💸 Expense Tracker — Full Stack MERN Project

A complete beginner-friendly project built with the **MERN Stack**:
- **M** — MongoDB (database: stores your data)
- **E** — Express (backend framework: handles requests)
- **R** — React (frontend: what the user sees)
- **N** — Node.js (runtime: runs JavaScript on the server)

---

## 📁 Folder Structure (what each folder does)

```
expense-tracker/
│
├── backend/                  ← The SERVER (runs on your computer / cloud)
│   ├── server.js             ← Entry point: starts the backend server
│   ├── .env                  ← Secret keys (DB password, port) — never share this!
│   ├── package.json          ← Lists all backend libraries needed
│   ├── config/
│   │   └── db.js             ← Connects to MongoDB database
│   ├── models/
│   │   └── Expense.js        ← Blueprint of what an expense looks like in DB
│   ├── routes/
│   │   └── expenses.js       ← API routes: GET/POST/DELETE expenses
│   └── middleware/
│       └── errorHandler.js   ← Catches errors and sends proper messages
│
├── frontend/                 ← The CLIENT (what user sees in browser)
│   ├── package.json          ← Lists all frontend libraries needed
│   ├── index.html            ← The single HTML file React injects into
│   ├── vite.config.js        ← Build tool config (Vite = faster than webpack)
│   └── src/
│       ├── main.jsx          ← Entry point: mounts React app
│       ├── App.jsx           ← Root component, holds routing
│       ├── index.css         ← Global styles
│       ├── context/
│       │   └── ExpenseContext.jsx  ← Global state (shared data across pages)
│       ├── components/
│       │   ├── Navbar.jsx          ← Top navigation bar
│       │   ├── ExpenseForm.jsx     ← Form to add a new expense
│       │   ├── ExpenseList.jsx     ← Shows all expenses
│       │   ├── ExpenseItem.jsx     ← Single expense card
│       │   └── Summary.jsx        ← Total spending summary
│       ├── pages/
│       │   ├── Dashboard.jsx      ← Main page (form + list + summary)
│       │   └── NotFound.jsx       ← 404 page
│       └── utils/
│           └── api.js             ← All API calls to backend in one place
│
├── .gitignore                ← Files git should NOT track (node_modules, .env)
└── README.md                 ← This file!
```

---

## 🚀 How to Run Locally (step by step)

### Prerequisites
Install these first:
1. [Node.js](https://nodejs.org) — v18 or above
2. [MongoDB Atlas](https://cloud.mongodb.com) — free cloud database (sign up)
3. [Git](https://git-scm.com)

### Step 1 — Backend Setup
```bash
cd backend
npm install
# Create a .env file and add your MongoDB URI (see .env.example)
npm run dev
```
Backend runs at: http://localhost:5000

### Step 2 — Frontend Setup
```bash
cd frontend
npm install
npm run dev
```
Frontend runs at: http://localhost:5173

---

## 🌐 Deployment
- **Backend** → [Render.com](https://render.com) (free tier)
- **Frontend** → [Vercel.com](https://vercel.com) (free tier)
- **Database** → [MongoDB Atlas](https://cloud.mongodb.com) (free tier)

See `/DEPLOYMENT.md` for step-by-step deployment guide.

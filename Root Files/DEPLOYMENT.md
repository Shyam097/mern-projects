# 🚀 DEPLOYMENT GUIDE
# From Local Code → Live on the Internet

---

## OVERVIEW: What you'll set up

```
Your Code (GitHub) 
    ↓
┌──────────────────────────────────────────────────┐
│  MongoDB Atlas  ←──  Render (Backend)            │
│  (Database)          https://your-app.onrender.com│
│                              ↑                   │
│              Vercel (Frontend)                   │
│         https://your-app.vercel.app              │
└──────────────────────────────────────────────────┘
```

---

## STEP 1 — Push Code to GitHub

1. Create a new GitHub repository (go to github.com → New Repository)
2. In your terminal, inside the project folder:

```bash
git init
git add .
git commit -m "Initial commit: Expense Tracker MERN app"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/expense-tracker.git
git push -u origin main
```

---

## STEP 2 — Set up MongoDB Atlas (the Database)

1. Go to https://cloud.mongodb.com → Sign up (free)
2. Create a new Project → Create a Cluster → Choose FREE tier
3. In "Database Access" → Add a database user:
   - Username: any (e.g., "admin")
   - Password: generate a strong password → SAVE IT
4. In "Network Access" → Add IP Address → "Allow Access from Anywhere" (0.0.0.0/0)
5. Click "Connect" on your cluster → "Connect your application"
6. Copy the connection string, it looks like:
   ```
   mongodb+srv://admin:YOUR_PASSWORD@cluster0.abc123.mongodb.net/?retryWrites=true&w=majority
   ```
7. Replace `<password>` with your actual password
8. Add the database name before `?`:
   ```
   mongodb+srv://admin:YOUR_PASSWORD@cluster0.abc123.mongodb.net/expense_tracker?retryWrites=true&w=majority
   ```

---

## STEP 3 — Deploy Backend to Render

1. Go to https://render.com → Sign up with GitHub
2. "New" → "Web Service" → Connect your GitHub repo
3. Configure:
   - **Name**: expense-tracker-api
   - **Root Directory**: backend
   - **Runtime**: Node
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Instance Type**: Free
4. Under "Environment Variables", add:
   - `MONGO_URI` → your MongoDB Atlas connection string from Step 2
   - `NODE_ENV` → `production`
   - `FRONTEND_URL` → (leave empty for now, we'll add it after Step 4)
5. Click "Create Web Service"
6. Wait 2-3 minutes for the build to complete
7. You'll get a URL like: https://expense-tracker-api.onrender.com
8. Test it: open that URL in your browser → you should see the API message

---

## STEP 4 — Deploy Frontend to Vercel

1. Go to https://vercel.com → Sign up with GitHub
2. "Add New Project" → Import your GitHub repository
3. Configure:
   - **Framework**: Vite
   - **Root Directory**: frontend
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
4. Under "Environment Variables":
   - `VITE_API_URL` → your Render backend URL + /api
   - Example: `https://expense-tracker-api.onrender.com/api`
5. Click "Deploy"
6. Wait ~1 minute → you'll get a URL like: https://expense-tracker.vercel.app

---

## STEP 5 — Connect Everything

1. Copy your Vercel frontend URL (e.g., https://expense-tracker.vercel.app)
2. Go back to Render → your service → Environment Variables
3. Update `FRONTEND_URL` → paste your Vercel URL
4. Render will redeploy automatically

---

## STEP 6 — Test Everything

Open your Vercel URL in the browser and:
- [ ] Add a new expense → it should save and appear in the list
- [ ] Filter by category → should work
- [ ] Refresh the page → expenses should persist (stored in MongoDB!)
- [ ] Check the pie chart → should update with your data

---

## 🐛 Common Issues

**Backend not connecting to MongoDB?**
→ Check MONGO_URI is correct (no spaces, password is right)
→ Check Network Access in Atlas allows 0.0.0.0/0

**Frontend showing "Network Error"?**
→ Check VITE_API_URL in Vercel matches your Render URL exactly
→ Make sure Render backend is actually running (check logs)

**Render backend sleeping?**
→ Free tier sleeps after 15 mins of inactivity, takes ~30s to wake up
→ This is normal on free tier

---

## 🎉 You're Live!

Share your Vercel URL with anyone — they can use your app from anywhere in the world.
Your expenses are stored in MongoDB Atlas (cloud) and your backend runs on Render (cloud).

# 🔧 AstraPanel - Common Issues & Quick Fixes

## ❌ Problem: "Database Connection Error" on Dashboard

### Cause:
Database file doesn't exist or not initialized.

### Solution:
```bash
cd server
npm run init-db
```

This will create:
- `server/config/astrapanel.db` file
- Users table
- Sites table
- Default admin user (admin/admin123)

---

## ❌ Problem: "Cannot GET /api/system/stats"

### Cause:
Backend server not running.

### Solution:
```bash
cd server
npm start
```

---

## ❌ Problem: "Network Error" on Login

### Cause:
Frontend trying to connect to wrong backend URL.

### Solution:
1. Make sure backend is running on port 3000
2. Check `client/src/api/axios.js` - baseURL should be `http://localhost:3000/api`
3. Clear browser cache (Ctrl+Shift+Delete)

---

## ❌ Problem: "Port 3000 Already in Use"

### Cause:
Another process using port 3000.

### Solution (Windows):
```powershell
# Find process
netstat -ano | findstr :3000

# Kill process (replace PID)
taskkill /PID <process_id> /F
```

### Solution (Linux/Mac):
```bash
# Find and kill
lsof -ti:3000 | xargs kill -9
```

---

## ❌ Problem: "npm ERR! Missing Dependencies"

### Solution:
```bash
# Backend
cd server
rm -rf node_modules
npm install

# Frontend
cd ../client
rm -rf node_modules
npm install
```

---

## ❌ Problem: "Cannot Login - Invalid Credentials"

### Solution:
Reset admin password:
```bash
cd server
node init-db.js
```

Default credentials:
- Username: `admin`
- Password: `admin123`

---

## ❌ Problem: "White Screen / Blank Page"

### Cause:
Frontend build missing or corrupted.

### Solution:
```bash
cd client
npm run build
```

Then restart backend:
```bash
cd ../server
npm start
```

---

## ❌ Problem: "CORS Error" in Console

### Cause:
CORS policy blocking requests.

### Solution:
Already configured in `server/index.js` - Make sure backend has:
```javascript
app.use(cors());
```

---

## ❌ Problem: Database Locked

### Cause:
Multiple processes accessing database.

### Solution:
```bash
# Stop all Node processes
taskkill /IM node.exe /F   # Windows
pkill node                 # Linux/Mac

# Restart server
cd server
npm start
```

---

## 🔄 Fresh Start (Nuclear Option)

If everything is broken, reset completely:

```bash
# Delete database
rm server/config/astrapanel.db

# Reinitialize
cd server
npm run init-db

# Rebuild frontend
cd ../client
npm run build

# Start server
cd ../server
npm start
```

---

## 🆘 Still Not Working?

1. Check terminal for error messages
2. Check browser console (F12) for errors
3. Verify Node.js version: `node -v` (should be 18.x or 20.x)
4. Verify ports:
   - Backend: http://localhost:3000
   - Frontend Dev: http://localhost:5173

---

## 📞 Quick Commands Reference

```bash
# Initialize database
cd server && npm run init-db

# Start backend
cd server && npm start

# Start frontend (dev mode)
cd client && npm run dev

# Build production
cd client && npm run build

# Test production mode
./build-and-run.bat  (Windows)
./build-and-run.sh   (Linux/Mac)
```

---

**Most common issue?** Database not initialized. Just run `npm run init-db`! ✅

const express = require('express');
const cors = require('cors');
const path = require('path'); // 1. Path module for serving frontend

// Import Routes
const authRoutes = require('./routes/authRoutes');
const systemRoutes = require('./routes/systemRoutes');
const siteRoutes = require('./routes/siteRoutes');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

// --- API ROUTES ---
app.use('/api/auth', authRoutes);      // For login: /api/auth/login
app.use('/api/system', systemRoutes);  // For stats: /api/system/stats
app.use('/api/sites', siteRoutes);     // For sites: /api/sites/create, /api/sites/list

// --- 2. FRONTEND SERVING (Production Mode) ---
// Serve React build files (dist folder)
app.use(express.static(path.join(__dirname, '../client/dist')));

// Handle React Router - Send all non-API requests to React
// Catch-all route must be last
app.use((req, res, next) => {
    // Skip API routes
    if (req.path.startsWith('/api')) {
        return next();
    }
    // Serve React app for all other routes
    res.sendFile(path.join(__dirname, '../client/dist/index.html'));
});

// Server Start
app.listen(PORT, () => {
    console.log(`✅ AstraPanel Server Running: http://localhost:${PORT}`);
    console.log(`📦 Production Mode: Serving Frontend from /client/dist`);
});

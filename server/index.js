const express = require('express');
const cors = require('cors');

// Import Routes
const authRoutes = require('./routes/authRoutes');
const systemRoutes = require('./routes/systemRoutes');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

// --- USE ROUTES ---
// Add prefix to keep URLs clean
app.use('/api/auth', authRoutes);      // For login: /api/auth/login
app.use('/api/system', systemRoutes);  // For stats: /api/system/stats

// Basic Test Route
app.get('/', (req, res) => {
    res.send('AstraPanel Backend is Running & Organized! 🚀');
});

// Server Start
app.listen(PORT, () => {
    console.log(`✅ AstraPanel Server Running: http://localhost:${PORT}`);
});

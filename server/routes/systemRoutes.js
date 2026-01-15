const express = require('express');
const router = express.Router();
const systemController = require('../controllers/systemController');
const verifyToken = require('../middleware/authMiddleware'); // Security Guard

// GET /api/system/stats (Protected Route 🔒)
// verifyToken runs first, if token is valid then getStats runs
router.get('/stats', verifyToken, systemController.getStats);

module.exports = router;

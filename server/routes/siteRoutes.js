const express = require('express');
const router = express.Router();
const siteController = require('../controllers/siteController');
const verifyToken = require('../middleware/authMiddleware'); // Security zaruri hai

// Create Site (Protected)
router.post('/create', verifyToken, siteController.createSite);

// List all Sites (Protected)
router.get('/list', verifyToken, siteController.getAllSites);

module.exports = router;

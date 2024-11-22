const express = require('express');
const router = express.Router();
const reportController = require('../controllers/reportController');

// Route to generate PDF report
router.get('/generate', reportController.generateReport);

module.exports = router;

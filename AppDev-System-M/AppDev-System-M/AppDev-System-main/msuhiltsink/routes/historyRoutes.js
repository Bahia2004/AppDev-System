const express = require('express');
const router = express.Router();
const historyController = require('../controllers/historyController');

// Render the main history page
router.get('/', (req, res) => {
  res.render('history', { title: 'History' });
});

// Routes for detailed views
router.get('/patient-records', historyController.getPatientRecords);
router.get('/medicine-inventory', historyController.getMedicineInventory);
router.get('/services', historyController.getServices);

module.exports = router;
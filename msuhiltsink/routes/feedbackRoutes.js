/*const express = require('express');
const router = express.Router();
const feedbackController = require('../controllers/feedbackController');

router.get('/:patient_id', feedbackController.getFeedback);
router.post('/add', feedbackController.addFeedback);

module.exports = router;

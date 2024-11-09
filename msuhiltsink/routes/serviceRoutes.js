// routes/servicesRoutes.js
const express = require('express');
const router = express.Router();
const serviceController = require('../controllers/serviceController');

// Route to list all services
router.get('/list', serviceController.getService);

// Routes for adding a new service
router.get('/add', serviceController.getAddService);
router.post('/add', serviceController.postAddService);

// Routes for editing an existing service
router.get('/edit/:id', serviceController.getEditService);
router.post('/edit/:id', serviceController.postEditService);

module.exports = router;

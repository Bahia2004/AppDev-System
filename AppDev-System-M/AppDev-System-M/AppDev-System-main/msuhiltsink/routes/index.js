const express = require('express');
const router = express.Router();

const adminRoutes = require('./adminRoutes');
/*const inventoryRoutes = require('./inventoryRoutes');
const feedbackRoutes = require('./feedbackRoutes');
const patientRoutes = require('./patientRoutes');
const appointmentRoutes = require('./appointmentRoutes');
const serviceRoutes = require('./serviceRoutes');*/

// Mount each route module on a path
router.use('/admin', adminRoutes);
/*router.use('/inventory', inventoryRoutes);
router.use('/feedback', feedbackRoutes);
router.use('/patients', patientRoutes);
router.use('/appointments', appointmentRoutes);
router.use('/services', serviceRoutes);*/

module.exports = router;

const express = require('express');
const router = express.Router();
const appointmentController = require('../controllers/appointmentController');

// Show all appointments
router.get('/', appointmentController.showAppointments);

// Book an appointment
router.post('/book', appointmentController.bookAppointment);

// Reschedule an appointment
router.post('/reschedule', appointmentController.rescheduleAppointment);

// Cancel an appointment
router.post('/cancel', appointmentController.cancelAppointment);

module.exports = router;

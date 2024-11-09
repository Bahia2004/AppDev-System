/*const express = require('express');
const router = express.Router();
const appointmentController = require('../controllers/appointmentController');
const reminderController = require('../controllers/reminderController');

router.get('/', appointmentController.getAppointments);
router.post('/add', appointmentController.addAppointment);
router.put('/update/:id', appointmentController.updateAppointment);
router.delete('/delete/:id', appointmentController.deleteAppointment);

router.get('/reminders/:appointment_id', reminderController.getReminders);
router.post('/reminders/add', reminderController.addReminder);

module.exports = router;

const express = require('express');
const router = express.Router();
const patientController = require('../controllers/patientController');

router.get('/list', patientController.getPatients);

router.get('/add', patientController.getAddPatient);
router.post('/add', patientController.postAddPatient);

router.get('/edit/:id', patientController.getEditPatient);
router.post('/edit/:id', patientController.postEditPatient);

router.get('/history/:id', patientController.getPatientHistory);

module.exports = router;

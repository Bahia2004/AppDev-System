const Patient = require('../models/Patient');
const Service = require('../models/Service');

exports.getPatients = async (req, res) => {
    try {
        const patients = await Patient.getAll();
        res.render('patient/list', { patients });
    } catch (error) {
        console.error(error);
        res.status(500).send('Error fetching patients');
    }
};

exports.getAddPatient = (req, res) => {
    res.render('patient/add');
};

exports.postAddPatient = async (req, res) => {
    try {
        console.log(req.body); // Check if data is coming through
        
        // Check if patient_id is provided in the form
        if (!req.body.patient_id) {
            return res.status(400).send('Patient ID is required');
        }

        await Patient.create(req.body);
        res.redirect('/patient/list');
    } catch (error) {
        console.error(error);
        res.status(500).send('Error adding patient');
    }
};


exports.getEditPatient = async (req, res) => {
    try {
        const patient = await Patient.getById(req.params.id); // Retrieve the patient data
        if (!patient) {
            return res.status(404).send('Patient not found');
        }
        res.render('patient/edit', { patient }); // Render the form with the patient data
    } catch (error) {
        console.error(error);
        res.status(500).send('Error fetching patient data');
    }
};

exports.postEditPatient = async (req, res) => {
    try {
        await Patient.update(req.params.id, req.body);
        res.redirect('/patient/list');
    } catch (error) {
        console.error(error);
        res.status(500).send('Error updating patient');
    }
};

exports.getPatientHistory = async (req, res) => {
    try {
        const patientId = req.params.id;

        // Fetch patient details
        const patient = await Patient.getById(patientId);
        if (!patient) {
            return res.status(404).send('Patient not found');
        }

        // Fetch patient's service history
        const serviceHistory = await Service.getByPatientId(patientId);

        // Render the history view, passing both patient and service history data
        res.render('patient/history', { patient, serviceHistory });
    } catch (error) {
        console.error("Error fetching patient history:", error);
        res.status(500).send('Error fetching patient history');
    }
};

// serviceController.js
const Service = require('../models/Service');
const Patient = require('../models/Patient');

exports.getService = async (req, res) => {
  try {
    const services = await Service.getAll();
    console.log("Fetched services:", services); // Log the services data to verify

    if (services.length === 0) {
      console.log("No services found.");
    }

    res.render('service/list', { services });
  } catch (error) {
    console.error("Error fetching services:", error);
    res.status(500).send('Error fetching services');
  }
};

exports.getAddService = async (req, res) => {
  try {
    const patients = await Patient.getAllNames();
    res.render('service/add', { patients });
  } catch (error) {
    console.error("Error fetching patients:", error);
    res.status(500).send('Error fetching patients');
  }
};

exports.postAddService = async (req, res) => {
  try {
    const patient = await Patient.getById(req.body.patient_id);
    if (!patient) {
      return res.status(404).send('Patient not found');
    }

    const serviceData = {
      ...req.body,
      patient_name: patient.fullName, // Assuming 'fullName' exists in the Patient model
    };

    await Service.addService(serviceData);
    res.redirect('/service/list');
  } catch (error) {
    console.error("Error adding service:", error);
    res.status(500).send('Error adding service');
  }
};

exports.getEditService = async (req, res) => {
  try {
    const service = await Service.getById(req.params.id);
    if (!service) {
      return res.status(404).send('Service not found');
    }
    res.render('service/edit', { service: service[0] });
  } catch (error) {
    console.error("Error fetching service data:", error);
    res.status(500).send('Error fetching service data');
  }
};

exports.postEditService = async (req, res) => {
  try {
    await Service.updateService(req.params.id, req.body);
    res.redirect('/service/list');
  } catch (error) {
    console.error("Error updating service:", error);
    res.status(500).send('Error updating service');
  }
};

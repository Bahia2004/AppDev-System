const Service = require('../models/Service');
const Patient = require('../models/Patient');
const Inventory = require('../models/inventory'); // Correct model name assumed

exports.getService = async (req, res) => {
  try {
    const services = await Service.getAll();

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
    const patients = await Patient.getAllNames(); // Fetch patient names
    const items = await Inventory.findAll(); // Fetch inventory items
    res.render('service/add', { patients, items });
  } catch (error) {
    console.error("Error fetching data:", error); 
    res.status(500).send('Error fetching data');
  }
};

exports.postAddService = async (req, res) => {
  const { 
      date, patient_id, doctor_in_charge, blood_pressure,
      pulse_rate, respiratory_rate, service_type, temperature,
      medical_notes, inventory_id, quantity 
  } = req.body;

  try {
      // Step 1: Fetch patient details
      const patient = await Patient.getById(patient_id);
      if (!patient) {
          return res.status(404).send('Patient not found');
      }

      // Step 2: Fetch inventory item details
      const inventoryItem = await Inventory.findByPk(inventory_id);
      if (!inventoryItem) {
          return res.status(404).send('Inventory item not found');
      }

      // Step 3: Check if inventory has enough stock
      if (inventoryItem.quantity < quantity) {
          return res.status(400).send('Not enough stock in inventory');
      }

      // Step 4: Deduct the quantity from the inventory
      await Inventory.updateQuantity(inventory_id, quantity); // Deduct quantity

      // Step 5: Prepare the service data (exclude quantity)
      const serviceData = {
          date,
          patient_id,
          doctor_in_charge,
          blood_pressure,
          pulse_rate,
          respiratory_rate,
          service_type,
          temperature,
          medical_notes,
          inventory_id, // Reference the inventory item
          patient_name: patient.fullName,
          medication: inventoryItem.item_name,
          quantity_taken: quantity,
      };

      // Step 6: Save the service data in the services table
      await Service.addService(serviceData);

      // Redirect to the services list
      res.redirect('/service/list');
  } catch (error) {
      console.error('Error adding service:', error);
      res.status(500).send('Error adding service');
  }
};

exports.getEditService = async (req, res) => {
  try {
    const service = await Service.getById(req.params.id);
    if (!service) {
      return res.status(404).send('Service not found');
    }

    // Fetch inventory items to populate the medication dropdown
    const items = await Inventory.findAll();

    res.render('service/edit', { service: service[0], items });
  } catch (error) {
    console.error("Error fetching service data:", error);
    res.status(500).send('Error fetching service data');
  }
};

exports.postEditService = async (req, res) => {
  try {
    const { inventory_id, quantity, ...serviceData } = req.body;

    // Fetch the correct inventory item using the inventory_id
    const inventoryItem = await Inventory.getById(inventory_id);
    if (!inventoryItem) {
      return res.status(404).send('Inventory item not found');
    }

    // Step 1: Check if there is a quantity change
    const service = await Service.getById(req.params.id);
    if (!service) {
      return res.status(404).send('Service not found');
    }
    const previousQuantity = service[0].quantity;

    if (quantity !== previousQuantity) {
      const quantityChange = quantity - previousQuantity;

      // Step 2: Update inventory based on the quantity difference
      if (inventoryItem.quantity < quantityChange) {
        return res.status(400).send('Not enough stock in inventory');
      }
      await Inventory.updateQuantity(inventory_id, -quantityChange); // Adjust stock
    }

    // Assign the medication to serviceData
    serviceData.medication = inventoryItem.item_name;

    // Step 3: Update the service record with the new data
    await Service.updateService(req.params.id, { ...serviceData, quantity });
    res.redirect('/service/list');
  } catch (error) {
    console.error("Error updating service:", error);
    res.status(500).send('Error updating service');
  }
};

const db = require('../config/db');

// Fetch Patient Records
exports.getPatientRecords = async (req, res) => {
  try {
    const [records] = await db.execute('SELECT * FROM patients ORDER BY createdAt DESC');
    res.render('history/patientRecords', { title: 'Patient Records', records });
  } catch (err) {
    res.status(500).send('Error fetching patient records.');
  }
};

// Fetch Medicine Inventory
exports.getMedicineInventory = async (req, res) => {
  try {
    const [inventory] = await db.execute('SELECT * FROM inventory ORDER BY created_at DESC');
    res.render('history/medicineInventory', { title: 'Medicine Inventory', inventory });
  } catch (err) {
    res.status(500).send('Error fetching inventory.');
  }
};

// Fetch Services History
exports.getServices = async (req, res) => {
  try {
    const [services] = await db.execute('SELECT * FROM services ORDER BY date DESC');
    res.render('history/services', { title: 'Service Records', services });
  } catch (err) {
    res.status(500).send('Error fetching services.');
  }
};

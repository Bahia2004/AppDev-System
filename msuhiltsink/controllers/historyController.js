const db = require('../config/db');

// Fetch Patient Records
exports.getPatientRecords = async (req, res) => {
  try {
    const [records] = await db.execute('SELECT * FROM patients ORDER BY created_at DESC');
    res.json({ success: true, records }); // Send JSON response
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Error fetching patient records.' });
  }
};

// Fetch Medicine Inventory
exports.getMedicineInventory = async (req, res) => {
  try {
    const [inventory] = await db.execute('SELECT * FROM inventory ORDER BY created_at DESC');
    res.json({ success: true, inventory }); // Send JSON response
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Error fetching inventory.' });
  }
};

// Fetch Service History
exports.getServices = async (req, res) => {
  try {
    const [services] = await db.execute('SELECT * FROM services ORDER BY date DESC');
    res.json({ success: true, services }); // Send JSON response
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Error fetching services.' });
  }
};

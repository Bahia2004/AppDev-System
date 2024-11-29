const Inventory = require('../models/inventory');
const memoryStorage = require('../utils/memoryStorage');

// Display Inventory List
exports.getInventory = async (req, res) => {
  try {
    const inventoryItems = await Inventory.findAll();
    res.render('inventory/list', { inventoryItems });
  } catch (error) {
    console.error('Error retrieving inventory list:', error); // Log the error for debugging
    res.status(500).send('Error retrieving inventory list');
  }
};

// Display Add Inventory Form
exports.addItemForm = (req, res) => {
  res.render('inventory/add');
};

// Add Inventory Item
exports.addItem = async (req, res) => {
  const { item_name, category, quantity, expiry_date } = req.body;
  try {
    await Inventory.create({ item_name, category, quantity, expiry_date });
    res.redirect('/inventory/list');
  } catch (error) {
    console.error('Error adding item:', error.message || error);
    res.status(500).send(`Error adding item: ${error.message}`);
  }
};

// Display Edit Inventory Form
exports.editItemForm = async (req, res) => {
  const { id } = req.params;
  try {
    const item = await Inventory.findByPk(id);
    if (item) {
      res.render('inventory/edit', { item });
    } else {
      res.status(404).send('Item not found');
    }
  } catch (error) {
    console.error('Error fetching item for edit:', error);
    res.status(500).send('Error fetching item for edit');
  }
};

// Update Inventory Item
exports.updateItem = async (req, res) => {
  const { id } = req.params;
  const { item_name, category } = req.body;

  try {
    await Inventory.update({ item_name, category }, id);
    res.redirect('/inventory/list');
  } catch (error) {
    console.error('Error updating item:', error);
    res.status(500).send('Error updating item');
  }
};



// Display Add Quantity Form
exports.addQuantity = async (req, res) => {
  const { id } = req.params;
  try {
    const item = await Inventory.findByPk(id);
    if (item) {
      res.render('inventory/add_quantity', { item });
    } else {
      res.status(404).send('Item not found');
    }
  } catch (error) {
    console.error('Error fetching item for quantity update:', error);
    res.status(500).send('Error fetching item for quantity update');
  }
};

// Add Quantity to Inventory Item
exports.addQuantityForm = async (req, res) => {
  const { id } = req.params;
  const { quantity_to_add } = req.body;

  try {
    const quantityChange = parseInt(quantity_to_add, 10);

    if (isNaN(quantityChange) || quantityChange === 0) {
      return res.status(400).send('Invalid quantity value. Must be a non-zero number.');
    }

    const item = await Inventory.findByPk(id);
    if (!item) {
      return res.status(404).send('Item not found');
    }

    const newQuantity = item.quantity + quantityChange;

    if (newQuantity < 0) {
      return res.status(400).send('Insufficient stock to subtract this quantity.');
    }

    // Log the update in memory (positive for addition, negative for subtraction)
    memoryStorage.logInventoryUpdate(id, quantityChange);

    // Update the quantity in the database
    await Inventory.addQuantity(id, quantityChange);

    res.redirect('/inventory/list');
  } catch (error) {
    console.error('Error updating quantity:', error);
    res.status(500).send('Error updating quantity');
  }
};


exports.getItemHistory = async (req, res) => {
  const { id } = req.params;

  try {
    // Fetch item history from in-memory storage instead of DB
    const itemHistory = memoryStorage.getInventoryHistory(id);

    if (itemHistory.length === 0) {
      return res.status(404).send('No history found for this item');
    }

    res.render('inventory/history', { itemHistory });
  } catch (error) {
    console.error('Error retrieving item history:', error);
    res.status(500).send('Error retrieving item history');
  }
};








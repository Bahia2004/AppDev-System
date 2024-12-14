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
    if (error.name === 'SequelizeUniqueConstraintError') {
      // Send a JSON response for duplicate entry
      return res.status(400).json({ error: `The medicine "${item_name}" already exists.` });
    }
    console.error('Error adding item:', error);
    res.status(500).json({ error: 'An unexpected error occurred. Please try again later.' });
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
  const { item_name, category, expiry_date } = req.body;

  try {
    await Inventory.update({ item_name, category, expiry_date }, id);
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

    const oldQuantity = item.quantity;
    const newQuantity = oldQuantity + quantityChange;

    if (newQuantity < 0) {
      return res.status(400).send('Insufficient stock to subtract this quantity.');
    }

    // Get the item name (medicine name)
    const itemName = item.item_name;

    // Log the update with quantity added and item name
    memoryStorage.logInventoryUpdate(id, itemName, quantityChange, oldQuantity, newQuantity);

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

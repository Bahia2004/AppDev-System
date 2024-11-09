const express = require('express');
const router = express.Router();
const inventoryController = require('../controllers/inventoryController');

// List all items
router.get('/list', inventoryController.getInventory);

// Show add item form
router.get('/add', inventoryController.addItemForm);

// Add new item
router.post('/add', inventoryController.addItem);

// Show edit form
router.get('/edit/:id', inventoryController.editItemForm);

// Update item
router.post('/edit/:id', inventoryController.updateItem);

router.get('/add-quantity/:id', inventoryController.addQuantity);

router.post('/add-quantity/:id', inventoryController.addQuantityForm);

// Route to display history for a specific item
router.get('/history/:id', inventoryController.getItemHistory);


module.exports = router;

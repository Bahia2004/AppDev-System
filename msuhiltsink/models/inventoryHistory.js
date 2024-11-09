const db = require('../config/db');

const InventoryHistory = {
  create: async ({ inventory_id, quantity_added, updated_at }) => {
    const query = 'INSERT INTO inventory (inventory_id, quantity_added, updated_at) VALUES (?, ?, ?)';
    const [result] = await db.execute(query, [inventory_id, quantity_added, updated_at]);
    return result;
  },

  findAll: async (inventory_id) => {
    const query = 'SELECT * FROM inventory WHERE inventory_id = ?';
    const [rows] = await db.execute(query, [inventory_id]);
    return rows;
  },
};

// Hook to update Inventory quantity automatically
InventoryHistory.beforeCreate(async (inventoryHistory, options) => {
  const inventoryItem = await Inventory.findByPk(inventoryHistory.inventory_id);
  if (inventoryItem) {
    inventoryItem.quantity += inventoryHistory.quantity_added;
    await inventoryItem.save(); // Save updated quantity
  }
});

module.exports = InventoryHistory;

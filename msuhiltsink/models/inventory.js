const db = require('../config/db');

const Inventory = {
  findAll: async () => {
    const [rows] = await db.execute('SELECT * FROM inventory');
    return rows;
  },
  getById: async (inventoryId) => {
    try {
      const [rows] = await db.query('SELECT inventory_id, item_name, quantity FROM inventory WHERE inventory_id = ?', [inventoryId]);
      return rows.length > 0 ? rows[0] : null;
    } catch (error) {
      console.error(`Error fetching inventory item with ID ${inventoryId}:`, error);
      throw error;
    }
  },
  
  create: async ({ item_name, category, quantity, expiry_date }) => {
    try {
      // Check if the item already exists
      const [existingItem] = await db.execute(
        'SELECT inventory_id, quantity FROM inventory WHERE item_name = ?',
        [item_name]
      );
  
      if (existingItem.length > 0) {
        // Item exists, update the quantity instead of creating a new one
        const query = `
          UPDATE inventory 
          SET quantity = quantity + ?, updated_at = CURRENT_TIMESTAMP
          WHERE inventory_id = ?
        `;
        await db.execute(query, [quantity, existingItem[0].inventory_id]);
        return { message: 'Quantity updated for existing item.' };
      }
  
      // Item does not exist, create a new record
      const query = 'INSERT INTO inventory (item_name, category, quantity, expiry_date) VALUES (?, ?, ?, ?)';
      const [result] = await db.execute(query, [item_name, category, quantity, expiry_date]);
      return result;
    } catch (error) {
      throw new Error(`Error adding item: ${error.message}`);
    }
  },
  
  findByPk: async (id) => {
    const query = 'SELECT * FROM inventory WHERE inventory_id = ?';
    const [rows] = await db.execute(query, [id]);
    return rows[0];
  },
  
  update: async ({ item_name, category }, id) => {
    const query = 'UPDATE inventory SET item_name = ?, category = ? WHERE inventory_id = ?';
    const [result] = await db.execute(query, [item_name, category, id]);
    return result;
  },


  addQuantity: async (id, quantityChange) => {
    const query = `
      UPDATE inventory 
      SET quantity = quantity + ?, 
          quantity_added = ?, 
          updated_at = CURRENT_TIMESTAMP
      WHERE inventory_id = ?
    `;
    const [result] = await db.execute(query, [quantityChange, quantityChange, id]);
    return result;
  },


  updateQuantity: async (inventoryId, quantity) => {
    try {
      await db.query(
        'UPDATE inventory SET quantity = quantity - ? WHERE inventory_id = ?', 
        [quantity, inventoryId]
      );
    } catch (error) {
      console.error("Error updating inventory quantity:", error);
      throw error;
    }
  },
  
  getItemHistory: async (id) => {
    const query = `
      SELECT item_name, quantity_added, updated_at
      FROM inventory 
      WHERE inventory_id = ? AND quantity_added IS NOT NULL
      ORDER BY updated_at DESC
    `;
    const [itemHistory] = await db.execute(query, [id]);
    return itemHistory;
  }
};

module.exports = Inventory;

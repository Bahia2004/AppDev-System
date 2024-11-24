const db = require('../config/db');

const Inventory = {
  findAll: async () => {
    const [rows] = await db.execute('SELECT * FROM inventory');
    return rows;
  },
  
  create: async ({ item_name, category, quantity, expiry_date }) => {
    const query = 'INSERT INTO inventory (item_name, category, quantity, expiry_date) VALUES (?, ?, ?, ?)';
    const [result] = await db.execute(query, [item_name, category, quantity, expiry_date]);
    return result;
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

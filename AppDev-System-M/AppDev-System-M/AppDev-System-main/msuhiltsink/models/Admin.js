const db = require('../config/db');
const bcrypt = require('bcrypt');

const Admin = {
  // Create a new admin
  createAdmin: async (username, password, email) => {
    // Validate input
    if (!username || !password || !email) {
      throw new Error('All fields are required');
    }

    // Check if the username or email already exists
    const existingAdminQuery = 'SELECT * FROM admin WHERE username = ? OR email = ?';
    const [existingAdmins] = await db.execute(existingAdminQuery, [username, email]);

    if (existingAdmins.length > 0) {
      throw new Error('Username or email already exists');
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert the new admin into the database
    const query = 'INSERT INTO admin (username, password, email) VALUES (?, ?, ?)';
    const [result] = await db.execute(query, [username, hashedPassword, email]);

    return result;
  },

  // Get an admin by username
  getAdminByUsername: async (username) => {
    const query = 'SELECT * FROM admin WHERE username = ?';
    const [admins] = await db.execute(query, [username]);
    return admins.length > 0 ? admins[0] : null; // Return the first admin found or null
  },
};

module.exports = Admin;
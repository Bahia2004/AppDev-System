// db.js
const mysql = require('mysql2');

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',        // replace with your database username
  password: '',        // replace with your database password
  database: 'minsu' // replace with your database name
});

module.exports = pool.promise();  // This gives you access to promise-based queries

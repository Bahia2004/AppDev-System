const pool = require('../config/db');

exports.getAppointmentStats = async () => {
    const query = `
        SELECT status, COUNT(*) AS count 
        FROM appointments 
        GROUP BY status;
    `;
    const [rows] = await pool.query(query);
    return rows;
};

exports.getDepartmentDistribution = async () => {
    const query = `
        SELECT department, COUNT(*) AS count 
        FROM patients 
        GROUP BY department;
    `;
    const [rows] = await pool.query(query);
    return rows;
};

exports.getInventoryUsage = async () => {
    const query = `
        SELECT item_name, quantity 
        FROM inventory;
    `;
    const [rows] = await pool.query(query);
    return rows;
};

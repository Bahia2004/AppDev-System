const pool = require('../config/db');

function filterByDateRange(dateRange, year) {
    let dateCondition = '';

    switch (dateRange) {
        case 'last_year':
            dateCondition = `YEAR(created_at) = ${year - 1}`;
            break;
        case 'last_month':
            dateCondition = `YEAR(created_at) = ${year} AND MONTH(created_at) = MONTH(CURRENT_DATE) - 1`;
            break;
        case 'last_week':
            dateCondition = `created_at >= CURDATE() - INTERVAL 1 WEEK`;
            break;
        case 'yesterday':
            dateCondition = `DATE(created_at) = CURDATE() - INTERVAL 1 DAY`;
            break;
        case 'all': // For 'all time' case
            dateCondition = `1`;  // This means no date filtering, retrieve all data
            break;
        default:
            dateCondition = `YEAR(created_at) = ${year}`;
            break;
    }

    return dateCondition;
}


exports.getAppointmentStats = async (dateRange, year) => {
    const dateCondition = filterByDateRange(dateRange, year);
    const query = `
        SELECT status, COUNT(*) AS count 
        FROM appointments 
        WHERE ${dateCondition}
        GROUP BY status;
    `;
    const [rows] = await pool.query(query);
    return rows;
};

exports.getDepartmentDistribution = async (dateRange, year) => {
    const dateCondition = filterByDateRange(dateRange, year);
    const query = `
        SELECT department, COUNT(*) AS count 
        FROM patients 
        WHERE ${dateCondition}
        GROUP BY department;
    `;
    const [rows] = await pool.query(query);
    return rows;
};

exports.getInventoryUsage = async (dateRange, year) => {
    const dateCondition = filterByDateRange(dateRange, year);
    const query = `
        SELECT item_name, quantity 
        FROM inventory
        WHERE ${dateCondition};
    `;
    const [rows] = await pool.query(query);
    return rows;
};

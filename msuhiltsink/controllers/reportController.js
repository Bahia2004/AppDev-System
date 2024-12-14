const pool = require('../config/db'); // Your database connection

// Function to convert data to CSV format
function convertToCSV(data) {
    // Create the header row (Medication, Quantity Taken, Person, Date)
    const header = ['Medication', 'Quantity Taken', 'Person', 'Date'];

    // Function to escape CSV values
    function escapeCSVValue(value) {
        // If the value contains commas or quotes, escape it
        if (value.includes(',') || value.includes('"')) {
            return `"${value.replace(/"/g, '""')}"`; // Escape double quotes inside the string
        }
        return value;
    }

    // Create the rows with medication, quantity taken, person, and formatted date
    const rows = data.map(row => [
        escapeCSVValue(row.medication), 
        escapeCSVValue(row.quantity_taken), 
        escapeCSVValue(row.patient_name), 
        escapeCSVValue(row.date + '\u00A0')  // Add non-breaking space to date to prevent formatting
    ]);

    // Combine the header and rows into a CSV string
    return [header, ...rows].map(row => row.join(',')).join('\n');
}

// Controller function to generate the report
exports.generateReport = async (req, res) => {
    try {
        console.log('Starting report generation...');

        // Fetch the data for medications taken in services with the formatted date
        const [medicationData] = await pool.query(`
            SELECT medication, SUM(quantity_taken) AS quantity_taken, patient_name, 
                   DATE_FORMAT(date, '%e-%b-%Y') AS date
            FROM services
            GROUP BY medication, patient_name, date
        `);
        console.log('Medication Data:', medicationData);

        // Prepare CSV data for medications
        const csvData = medicationData.map(row => ({
            medication: row.medication, // Medication name
            quantity_taken: row.quantity_taken, // Total quantity of the medication taken
            patient_name: row.patient_name, // Person who took the medicine
            date: row.date // The formatted date '9-Nov-2024'
        }));

        // Convert the data to CSV format
        const csvString = convertToCSV(csvData);

        // Add BOM for UTF-8 encoding to ensure proper rendering in Excel/CSV viewers
        const utf8BOM = '\uFEFF';

        // Set the response headers for CSV file download
        res.setHeader('Content-Type', 'text/csv; charset=utf-8');
        res.setHeader('Content-Disposition', 'attachment; filename="MinSU_HealthSync_Report.csv"');

        // Send the CSV data with BOM as the response
        res.send(utf8BOM + csvString);
    } catch (error) {
        console.error('Error during report generation:', error);
        res.status(500).send('Error generating report');
    }
};

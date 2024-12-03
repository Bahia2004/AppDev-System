const PDFDocument = require('pdfkit'); // Import PDFKit
const fs = require('fs'); // File system for saving PDFsconst pool = require('../config/db'); // Your database connection
const pool = require('../config/db'); // Your database connection
const { getGoogleFormResponses } = require('../services/googleSheetsService'); // Google Forms service

// Helper function to convert data to CSV format
function convertToCSV(data) {
    const header = Object.keys(data[0]).join(','); // Assuming all records have the same structure
    const rows = data.map(row => Object.values(row).join(',')).join('\n');
    return `${header}\n${rows}`;
}

exports.generateReport = async (req, res) => {
    try {
        console.log('Starting report generation...');

        // Fetch data from the database
        const [appointmentsData] = await pool.query('SELECT COUNT(*) AS appointments FROM appointments');
        console.log('Appointments Data:', appointmentsData);

        const [patientsData] = await pool.query('SELECT COUNT(*) AS patients FROM patients');
        console.log('Patients Data:', patientsData);

        const [inventoryData] = await pool.query('SELECT COUNT(*) AS inventory FROM inventory');
        console.log('Inventory Data:', inventoryData);

        // Fetch Google Form responses
        const formResponses = await getGoogleFormResponses();
        console.log('Google Form Responses:', formResponses);

        // Prepare CSV data
        const csvData = [
            { category: 'Appointments', value: appointmentsData[0]?.appointments || 0 },
            { category: 'Patients', value: patientsData[0]?.patients || 0 },
            { category: 'Inventory', value: inventoryData[0]?.inventory || 0 },
            { category: 'Feedback Responses', value: '' }, // Separate line for feedback
            ...formResponses.map((response, index) => ({
                category: `Feedback #${index + 1}`,
                value: response[1] || 'No response', // Adjust index based on response structure
            })),
        ];

        // Convert the data to CSV format
        const csvString = convertToCSV(csvData);

        // Set the response headers for CSV file download
        res.setHeader('Content-Type', 'text/csv');
        res.setHeader('Content-Disposition', 'attachment; filename="MinSU_HealthSync_Report.csv"');

        // Send the CSV data as the response
        res.send(csvString);
    } catch (error) {
        console.error('Error during report generation:', error);
        res.status(500).send('Error generating report');
    }
};

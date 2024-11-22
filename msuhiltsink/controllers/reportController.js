const pool = require('../config/db'); // Your database connection
const PDFDocument = require('pdfkit'); // Import PDFKit
const fs = require('fs'); // File system for saving PDFs
const { getGoogleFormResponses } = require('../services/googleSheetsService'); // Google Forms service

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

    // Create a new PDF document
    const doc = new PDFDocument();

    // Stream the PDF as a response
    res.setHeader('Content-Type', 'application/pdf');
    doc.pipe(res);

    // Add content to the PDF
    doc.fontSize(20).text('MSU HealthSync Report', { align: 'center' }).moveDown(2);

    doc.fontSize(14).text(`Appointments: ${appointmentsData[0]?.appointments || 0}`);
    doc.text(`Patients: ${patientsData[0]?.patients || 0}`);
    doc.text(`Inventory: ${inventoryData[0]?.inventory || 0}`).moveDown(2);

    doc.fontSize(16).text('Feedback Responses:', { underline: true }).moveDown(0.5);

    // Add Google Form responses dynamically
    formResponses.forEach((response, index) => {
      const feedback = response[1] || 'No response'; // Adjust index based on response structure
      doc.fontSize(12).text(`Feedback #${index + 1}: ${feedback}`);
    });

    // Finalize the PDF and end the stream
    doc.end();
  } catch (error) {
    console.error('Error during report generation:', error);
    res.status(500).send('Error generating report');
  }
};

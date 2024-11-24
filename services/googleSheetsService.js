const { google } = require('googleapis');
const path = require('path');

// Google Sheets API authentication
const SCOPES = ['https://www.googleapis.com/auth/spreadsheets.readonly'];
const SPREADSHEET_ID = '1LlAm_RRE6mGKO0p4plyKzSjtirywq5_F__1lN3zz_zU'; // Replace with your Google Sheet ID

const auth = new google.auth.GoogleAuth({
    keyFile: path.join(__dirname, '../config/crack-celerity-442515-i8-9ba5b5aaaf46.json'), // Correct relative path
    scopes: SCOPES,
});

const sheets = google.sheets({ version: 'v4', auth });

// Function to fetch responses from Google Forms (stored in Google Sheets)
async function getGoogleFormResponses() {
  try {
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: SPREADSHEET_ID,
      range: 'Form Responses 1!A1:N', // Adjust the range based on your form layout
    });

    return response.data.values; // This will return an array of rows from the sheet
  } catch (error) {
    console.error('Error fetching data from Google Sheets:', error);
    throw error;
  }
}

module.exports = { getGoogleFormResponses };

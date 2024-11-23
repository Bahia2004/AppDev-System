const { getGoogleFormResponses } = require('../services/googleSheetsService');
const dashboardModel = require('../models/dashboard');

async function getSatisfactionData() {
    const responses = await getGoogleFormResponses();

    // Log the first 3 responses for better understanding of the data structure
    console.log("First 3 responses data:", responses.slice(1, 4)); // Skipping header

    // Initialize satisfaction levels
    const satisfactionCategories = {
        "Very Satisfied": 0,
        "Satisfied": 0,
        "Neutral": 0,
        "Dissatisfied": 0,
        "Very Dissatisfied": 0,
    };

    // Define valid satisfaction levels
    const validSatisfactionLevels = new Set(["Very Satisfied", "Satisfied", "Neutral", "Dissatisfied", "Very Dissatisfied"]);

    // Loop through each response and log the columns to check where satisfaction data starts
    responses.slice(1).forEach((response, index) => {
        console.log(`Checking response ${index + 1}:`, response);

        // Log columns from 7 onwards to check if they contain satisfaction data
        for (let colIndex = 7; colIndex < response.length; colIndex++) {
            const satisfactionLevel = response[colIndex]?.trim();
            console.log(`Checking column ${colIndex + 1} for satisfaction level:`, satisfactionLevel);

            if (validSatisfactionLevels.has(satisfactionLevel)) {
                satisfactionCategories[satisfactionLevel]++;
            }
        }
    });

    return satisfactionCategories;
}




exports.getDashboardData = async (req, res) => {
    try {
   
         const satisfactionData = await getSatisfactionData();
         const appointmentStats = await dashboardModel.getAppointmentStats();
         const department = await dashboardModel.getDepartmentDistribution();
         const inventoryUsage = await dashboardModel.getInventoryUsage();

        res.json({
            satisfactionData, 
             appointmentStats, 
             department, 
             inventoryUsage
        });
    } catch (error) {
        console.error('Error fetching dashboard data:', error);
        res.status(500).json({ error: 'Error fetching dashboard data' });
    }
};

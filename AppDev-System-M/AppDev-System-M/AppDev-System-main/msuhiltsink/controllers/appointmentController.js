const Appointment = require('../models/appointment');
const sendEmail = require('../utils/mailer');

// Show all appointments
async function showAppointments(req, res) {
    try {
        const appointments = await Appointment.getAppointments(); // Now getAppointments() is defined
        res.render('appointment', { appointments });
    } catch (error) {
        console.error('Error fetching appointments:', error);
        res.status(500).send('Error fetching appointments');
    }
}

/// Book a new appointment
async function bookAppointment(req, res) {
    const { patient_id, appointment_date } = req.body;
    try {
        const appointmentId = await Appointment.createAppointment(patient_id, appointment_date);

        // Get the patient's email dynamically (from your database)
        const patientEmail = await Appointment.getPatientEmail(patient_id);

        // Send booking confirmation email dynamically
        const subject = 'Appointment Confirmation - MSU Hilthsink';
        const text = `

Thank you for choosing MSU Hilthsink. 

We are pleased to confirm that your appointment has been successfully booked:

Date and Time: ${appointment_date}  
Clinic Location: Near Library

Please arrive at least 10 minutes early to complete any necessary preparations. If you have any questions or need assistance, feel free to contact us at 09065148161 or aash100227@gmail.com.

We look forward to serving you.

Warm regards,  
MSU Hiltsink Team`;
        await sendEmail(patientEmail, subject, text);  // Dynamically passing email and content

        res.redirect('/appointment');  // Redirect to appointments page
    } catch (error) {
        console.error('Error booking appointment:', error);
        res.status(500).send('Error booking appointment');
    }
}

// Reschedule an appointment
async function rescheduleAppointment(req, res) {
    const { appointment_id, new_date } = req.body;
    try {
        await Appointment.rescheduleAppointment(appointment_id, new_date);

        // Get the patient's email dynamically for reschedule notification
        const appointmentDetails = await Appointment.getAppointmentDetails(appointment_id);
        const patientEmail = await Appointment.getPatientEmail(appointmentDetails.patient_id);

        const subject = 'Appointment Rescheduled - MSU Hiltsink';
        const text = `Your appointment with MSU Hiltsink has been rescheduled successfully:

New Date and Time: ${new_date}  
Clinic Location: Near Library

Please let us know if you need further adjustments or have any questions. You can reach us at 09065148161  or aash100227@gmail.com.

Thank you for your understanding and continued trust.

Best regards,  
MSU Hiltsink Team`;
        await sendEmail(patientEmail, subject, text);

        res.redirect('/appointment');
    } catch (error) {
        console.error('Error rescheduling appointment:', error);
        res.status(500).send('Error rescheduling appointment');
    }
}

// Cancel an appointment
async function cancelAppointment(req, res) {
    const { appointment_id } = req.body;
    try {
        // Validate if appointment_id is provided
        if (!appointment_id) {
            return res.status(400).json({ error: 'Appointment ID is required' });
        }

        // Fetch appointment details (and patient_id) using appointment_id
        const appointment = await Appointment.getAppointmentDetails(appointment_id);

        if (!appointment) {
            return res.status(404).json({ error: 'Appointment not found' });
        }

        const { patient_id, appointment_date } = appointment; // Destructure appointment_date and patient_id

        // Proceed with canceling the appointment
        await Appointment.cancelAppointment(appointment_id);

        // Fetch patient's email for the cancellation notification
        const patientEmail = await Appointment.getPatientEmail(patient_id);

        // Send email notification for cancellation
        const subject = 'Appointment Canceled - MSU Hiltsink';
        const text = `
We regret to inform you that your appointment with MSU Hiltsink has been canceled:

Original Date and Time: ${appointment_date}  

If you would like to reschedule, please visit our website or contact us directly at 09065148161 or aash100227@gmail.com.

We apologize for any inconvenience this may have caused. Thank you for your understanding.

Kind regards,  
MSU Hiltsink Team`;
        await sendEmail(patientEmail, subject, text);
        res.redirect('/appointment');

    } catch (error) {
        console.error('Error canceling appointment:', error);
        res.status(500).json({ error: error.message });
    }
}

module.exports = {
    showAppointments,
    bookAppointment,
    rescheduleAppointment,
    cancelAppointment
};
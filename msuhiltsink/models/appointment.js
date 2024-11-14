const db = require('../config/db'); // Database connection

class Appointment {
    // Method to get all appointments
    static async getAppointments() {
        const query = 'SELECT * FROM appointments';
        const [rows] = await db.execute(query);
        return rows;
    }

    // Method to get the patient email by patient_id
    static async getPatientEmail(patient_id) {
        if (!patient_id) throw new Error('Patient ID is required');
        
        const query = 'SELECT email FROM patients WHERE patient_id = ?';
        const [rows] = await db.execute(query, [patient_id]);
        
        if (rows.length > 0) {
            return rows[0].email;
        } else {
            throw new Error('Patient not found');
        }
    }

    // Method to create a new appointment
    static async createAppointment(patient_id, appointment_date) {
        if (!patient_id || !appointment_date) {
            throw new Error("Patient ID and appointment date are required");
        }

        const query = 'INSERT INTO appointments (patient_id, appointment_date, status) VALUES (?, ?, ?)';
        const [result] = await db.execute(query, [patient_id, appointment_date, 'Booked']);
        return result.insertId;
    }

    // Method to update an existing appointment (for rescheduling)
    static async rescheduleAppointment(appointment_id, new_date) {
        if (!appointment_id || !new_date) {
            throw new Error("Appointment ID and new date are required for rescheduling");
        }

        const query = 'UPDATE appointments SET appointment_date = ?, status = ? WHERE appointment_id = ?';
        const [result] = await db.execute(query, [new_date, 'Rescheduled', appointment_id]);
        
        if (result.affectedRows === 0) {
            throw new Error("Appointment not found or could not be updated");
        }

        return result.affectedRows;
    }

    // Method to cancel an appointment
    static async cancelAppointment(appointment_id) {
        if (!appointment_id) throw new Error("Appointment ID is required to cancel");

        const query = 'UPDATE appointments SET status = ? WHERE appointment_id = ?';
        const [result] = await db.execute(query, ['Canceled', appointment_id]);
        
        if (result.affectedRows === 0) {
            throw new Error("Appointment not found or could not be canceled");
        }

        return result.affectedRows;
    }

    // Method to get appointment details by appointment_id
    static async getAppointmentDetails(appointment_id) {
        if (!appointment_id) throw new Error("Appointment ID is required");

        const query = 'SELECT * FROM appointments WHERE appointment_id = ?';
        const [rows] = await db.execute(query, [appointment_id]);
        
        if (rows.length > 0) {
            return rows[0]; // Return the appointment details
        } else {
            throw new Error('Appointment not found');
        }
    }
}

module.exports = Appointment;

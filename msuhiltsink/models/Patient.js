const db = require('../config/db'); // Database connection

class Patient {
    static async getAll() {
        const [patient] = await db.query('SELECT * FROM patients');
        return patient;
    }

    static async getById(patient_id) {
        const [patient] = await db.query('SELECT * FROM patients WHERE patient_id = ?', [patient_id]);
        return patient[0];
    }

    static async create(patientData) {
        const { patient_id, address, email, bloodType, contact, department, fullName, gender, guardian, guardian_contact, height, weight } = patientData;
        // Check if patient_id is provided before insertion
        if (!patient_id) {
            throw new Error('Patient ID is required');
        }

        await db.query(
            'INSERT INTO patients (patient_id, address, email, bloodType, contact, department, fullName, gender, guardian, guardian_contact, height, weight) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
            [patient_id, address, email, bloodType, contact, department, fullName, gender, guardian, guardian_contact, height, weight]
        );
    }

    static async update(patient_id, patientData) {
        const { address, email, bloodType, contact, department, fullName, gender, guardian, guardian_contact, height, weight } = patientData;

        // Check if patient_id is provided before updating
        if (!patient_id) {
            throw new Error('Patient ID is required');
        }

        await db.query(
            'UPDATE patients SET address = ?, email = ?, bloodType = ?, contact = ?, department = ?, fullName = ?, gender = ?, guardian = ?, guardian_contact = ?, height = ?, weight = ? WHERE patient_id = ?',
            [address, email, bloodType, contact, department, fullName, gender, guardian, guardian_contact, height, weight, patient_id]
        );
    }
    static async getAllNames() {
        // Fetch only fullName and patient_id for the dropdown
        const [patients] = await db.query('SELECT patient_id, fullName FROM patients');
        return patients;
    }
    
}

module.exports = Patient;

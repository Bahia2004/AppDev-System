// Service.js
const db = require('../config/db');

const Service = {
  getAll: async () => {
    try {
      const [rows] = await db.query(`
        SELECT service_id, patient_id, patient_name, doctor_in_charge, date, 
               service_type, blood_pressure, pulse_rate, respiratory_rate, 
               temperature, medication, quantity_taken, medical_notes
        FROM services
      `);
      return rows;
    } catch (error) {
      console.error("Error fetching all services:", error);
      throw error;
    }
  },


  getById: async (id) => {
    try {
      const [rows] = await db.query('SELECT * FROM services WHERE service_id = ?', [id]);
      return rows;
    } catch (error) {
      console.error(`Error fetching service with ID ${id}:`, error);
      throw error;
    }
  },

  addService: async (serviceData) => {
    try {
        return await db.query('INSERT INTO services SET ?', serviceData);
    } catch (error) {
        console.error("Error adding service:", error);
        throw error;
    }
},

  
  updateService: async (id, serviceData) => {
    try {
      return await db.query('UPDATE services SET ? WHERE service_id = ?', [serviceData, id]);
    } catch (error) {
      console.error(`Error updating service with ID ${id}:`, error);
      throw error;
    }
  },
  getByPatientId: async (patientId) => {
    try {
      const [services] = await db.query(
        'SELECT doctor_in_charge, date, service_type, blood_pressure, pulse_rate, respiratory_rate, temperature, medication, medical_notes FROM services WHERE patient_id = ?',
        [patientId]
      );
      return services;
    } catch (error) {
      console.error("Error fetching service history for patient:", error);
      throw error;
    }
  },
};


module.exports = Service;

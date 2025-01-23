const Patient = require('../models/Patient');
const Category = require('../models/Category'); // Import Category model

// Create a new patient
exports.createPatient = async (req, res) => {
    try {
        const { id } = req.params; // Extract category ID
        const { name, lastname, age } = req.body; // Extract patient details

        // Check if the category exists
        const categoryExists = await Category.findById(id);
        if (!categoryExists) {
            return res.status(404).json({ message: "Category not found" });
        }

        // Validate required fields
        if (!name || !lastname || !age) {
            return res.status(400).json({ message: "Name, lastname, and age are required" });
        }

        // Create and save the patient
        const patient = new Patient({ name, lastname, age, category: id });
        await patient.save();

        res.status(201).json(patient);
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

// Get all patients
exports.getPatients = async (req, res) => {
    try {
        const patients = await Patient.find().populate('category', 'name');
        res.status(200).json(patients);
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

// Get a single patient by ID
exports.getPatientById = async (req, res) => {
    try {
        const patient = await Patient.findById(req.params.id).populate('category', 'name');
        if (!patient) {
            return res.status(404).json({ message: "Patient not found" });
        }
        res.status(200).json(patient);
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

// Update a patient by ID
exports.updatePatient = async (req, res) => {
    try {
        const { name, lastname, age } = req.body;

        // Validate fields if necessary
        if (!name && !lastname && !age) {
            return res.status(400).json({ message: "At least one field (name, lastname, or age) must be provided" });
        }

        const patient = await Patient.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        ).populate('category', 'name');

        if (!patient) {
            return res.status(404).json({ message: "Patient not found" });
        }
        res.status(200).json(patient);
    } catch (error) {
        res.status(400).json({ message: "Error updating patient", error: error.message });
    }
};

// Delete a patient by ID
exports.deletePatient = async (req, res) => {
    try {
        const patient = await Patient.findByIdAndDelete(req.params.id);
        if (!patient) {
            return res.status(404).json({ message: "Patient not found" });
        }
        res.status(200).json({ message: "Patient deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

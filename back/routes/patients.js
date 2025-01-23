const express = require('express');
const router = express.Router();
const patientController = require('../controllers/patientController');

/**
 * @swagger
 * tags:
 *   name: Patients
 *   description: API for managing patients
 */

/**
 * @swagger
 * /patients/category/{id}:
 *   post:
 *     summary: Create a new patient and associate with a category
 *     tags: [Patients]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the category to associate with the patient
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - lastname
 *               - age
 *             properties:
 *               name:
 *                 type: string
 *               lastname:
 *                 type: string
 *               age:
 *                 type: number
 *     responses:
 *       201:
 *         description: Patient created successfully
 *       404:
 *         description: Category not found
 *       400:
 *         description: Invalid input
 */
router.post('/category/:id', patientController.createPatient);

/**
 * @swagger
 * /patients:
 *   get:
 *     summary: Get all patients
 *     tags: [Patients]
 *     responses:
 *       200:
 *         description: A list of patients
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                   name:
 *                     type: string
 *                   lastname:
 *                     type: string
 *                   age:
 *                     type: number
 *                   category:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                       name:
 *                         type: string
 *       500:
 *         description: Server error
 */
router.get('/', patientController.getPatients);

/**
 * @swagger
 * /patients/{id}:
 *   get:
 *     summary: Get a patient by ID
 *     tags: [Patients]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the patient
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: The patient details
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                 name:
 *                   type: string
 *                 lastname:
 *                   type: string
 *                 age:
 *                   type: number
 *                 category:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                     name:
 *                       type: string
 *       404:
 *         description: Patient not found
 */
router.get('/:id', patientController.getPatientById);

/**
 * @swagger
 * /patients/{id}:
 *   put:
 *     summary: Update a patient
 *     tags: [Patients]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the patient to update
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               lastname:
 *                 type: string
 *               age:
 *                 type: number
 *     responses:
 *       200:
 *         description: Patient updated successfully
 *       404:
 *         description: Patient not found
 *       400:
 *         description: Invalid input
 */
router.put('/:id', patientController.updatePatient);

/**
 * @swagger
 * /patients/{id}:
 *   delete:
 *     summary: Delete a patient
 *     tags: [Patients]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the patient to delete
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Patient deleted successfully
 *       404:
 *         description: Patient not found
 */
router.delete('/:id', patientController.deletePatient);

module.exports = router;

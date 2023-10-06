// Routes for appointment
const express = require('express');
const { createAppointment, deleteAppointment } = require('../controllers/AppointmentController');

const router = express.Router();

router.post('/create', createAppointment);
router.delete('/delete', deleteAppointment);

module.exports = router;
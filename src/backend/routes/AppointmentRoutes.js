// Routes for appointment
const express = require('express');
const { createAppointment, deleteAppointment, bookAppointment, getAppointmentSlotsForProvider } = require('../controllers/AppointmentController');

const router = express.Router();

router.get('/provider', getAppointmentSlotsForProvider);
router.post('/create', createAppointment);
router.delete('/delete', deleteAppointment);
router.post('/book', bookAppointment);

module.exports = router;
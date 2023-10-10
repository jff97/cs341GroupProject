// Routes for appointment
const express = require('express');

const { createAppointment, deleteAppointment, bookAppointment, cancelAppointment, modifyAppointmentTime, getAppointmentSlotsForProvider, getAllAvailableAppointments, getAppointmentsByUser } = require('../controllers/AppointmentController');

const router = express.Router();

router.get('/provider', getAppointmentSlotsForProvider);
router.post('/create', createAppointment);
router.delete('/delete', deleteAppointment);
router.put('/book', bookAppointment);
router.put('/cancel', cancelAppointment);
router.post('/modify', modifyAppointmentTime);
router.get('/available', getAllAvailableAppointments);
router.get('/usersAppointments', getAppointmentsByUser)

module.exports = router;
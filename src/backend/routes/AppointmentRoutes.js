// Routes for appointment
const express = require('express');
const { enforceAuthentication } = require('../middlewares/auth_middleware');

const { createAppointment, deleteAppointment, bookAppointment, cancelAppointment, modifyAppointmentTime, getAppointmentSlotsForProvider, getAllAvailableAppointments, getAppointmentsByUser, getAllSystemAppointments } = require('../controllers/AppointmentController');

const router = express.Router();

router.get('/provider', enforceAuthentication, getAppointmentSlotsForProvider);
router.post('/create', createAppointment);
router.delete('/delete', deleteAppointment);
router.put('/book', bookAppointment);
router.put('/cancel', cancelAppointment);
router.post('/modify', modifyAppointmentTime);
router.get('/available', getAllAvailableAppointments);
router.get('/usersAppointments', getAppointmentsByUser)
router.get('/systemAppointments', getAllSystemAppointments);

module.exports = router;
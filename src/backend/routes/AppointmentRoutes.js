// Routes for appointment
const express = require('express');
const { enforceAuthentication } = require('../middlewares/auth_middleware');

const { createAppointment, deleteAppointment, bookAppointment, cancelAppointment, getAppointmentSlotsForProvider, getAllAvailableAppointments, getAppointmentsByUser, getAppointmentsInRange, modifyAppointment, getAppointmentTrends, getAllServiceProviders } = require('../controllers/AppointmentController');

const router = express.Router();

router.get('/provider', enforceAuthentication, getAppointmentSlotsForProvider);
router.post('/create', enforceAuthentication, createAppointment);
router.delete('/delete', enforceAuthentication, deleteAppointment);
router.put('/book', enforceAuthentication, bookAppointment);
router.put('/cancel', enforceAuthentication, cancelAppointment);
router.get('/available', enforceAuthentication, getAllAvailableAppointments);
router.get('/usersAppointments', enforceAuthentication, getAppointmentsByUser)
router.get('/systemAppointments', enforceAuthentication, getAppointmentsInRange);
router.put('/modify', enforceAuthentication, modifyAppointment);
router.get('/trends', enforceAuthentication, getAppointmentTrends)
router.get('/adminTrends', enforceAuthentication, getAllServiceProviders)

module.exports = router;
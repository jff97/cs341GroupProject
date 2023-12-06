//Author: Creed Zagrzebski, John Fox, Alex Cappel, Peter Xiong
//Date Created: October 5 2023 
//Dates Modified: October 7, 8, 10, 14
//                November 5, 6, 8, 14, 16
//Class & Methods Explained: This class is used to define routes for appointment related operations

// Routes for appointment
const express = require('express');
const { enforceAuthentication } = require('../middlewares/auth_middleware');

const { createAppointment, deleteAppointment, bookAppointment, cancelAppointment, modifyAppointmentTime, getAppointmentSlotsForProvider, getAllAvailableAppointments, getAppointmentsByUser, getAllSystemAppointments, modifyAppointment, getAppointmentTrends, getAllServiceProviders } = require('../controllers/AppointmentController');

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
router.put('/modify', modifyAppointment);
router.get('/trends', getAppointmentTrends)
router.get('/adminTrends', getAllServiceProviders)

module.exports = router;
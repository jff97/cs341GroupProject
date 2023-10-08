// Routes for appointment
const express = require('express');
const { createAppointment, deleteAppointment, bookAppointment, cancelAppointment, modifyAppointmentTime } = require('../controllers/AppointmentController');

const router = express.Router();

router.post('/create', createAppointment);
router.delete('/delete', deleteAppointment);
router.post('/book', bookAppointment);
router.post('/cancel', cancelAppointment);
router.post('/modify', modifyAppointmentTime);

module.exports = router;
const AppointmentService = require('../services/AppointmentService');

async function createAppointment(req, res, next) {
    try {
        await AppointmentService.createAppointment(req.body);
        res.status(201).send("Appointment successfully created!");
    } catch (err) {
        next(err);
    }
}

async function deleteAppointment(req, res, next) {
    try {
        await AppointmentService.deleteAppointment(req.query);
        res.status(200).send("Appointment successfully deleted!");
    } catch (err) {
        next(err);
    }
}

module.exports = {
    createAppointment, deleteAppointment
};
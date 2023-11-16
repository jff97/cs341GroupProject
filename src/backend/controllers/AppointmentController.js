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

async function bookAppointment(req, res, next) {
    try {
        await AppointmentService.bookAppointment(req.body);
        res.status(201).send("Appointment booked successfully!");
    } catch (err) {
        next(err);
    }
}


async function getAppointmentSlotsForProvider(req, res, next) {
    try {
        const data = await AppointmentService.getAllAppointmentSlotsForProvider(req.query.UserID);
        res.status(200).send(data);
    } catch (err) {
        next(err);
    }
}

async function cancelAppointment(req, res, next) {
    try {
        await AppointmentService.cancelAppointment(req.body);
        res.status(201).send("Appointment cancelled successfully!");
    } catch (err) {
        next(err);
    }
}

async function modifyAppointmentTime(req, res, next) {
    try {
        await AppointmentService.modifyAppointmentTime(req.body);
        res.status(201).send("Appointment time modified successfully!");
    } catch (err) {
        next(err);
    }
}

async function getAllSystemAppointments(req, res, next) {
    try {
        const data = await AppointmentService.getAllSystemAppointments(req.query.filterDate);
        res.status(200).send(data);
    } catch (err) {
        next(err);
    }
}

async function getAllAvailableAppointments(req, res, next) {
    try {
        const data = await AppointmentService.getAllAvailableAppointments();
        res.status(200).send(data);
    } catch (err) {
        next(err);
    }
}

async function getAppointmentsByUser(req, res, next) {
    try {
        const data = await AppointmentService.getAppointmentsByUser(req.query.UserID);
        res.status(200).send(data);
    } catch (err) {
        next(err);
    }
}

async function modifyAppointment(req, res, next) {
    try {
        await AppointmentService.modifyAppointment(req.body);
        res.status(201).send("Appointment modified successfully!");
    } catch (err) {
        next(err);
    }
}

async function getAppointmentTrends(req, res, next) {
    try {
        const data = await AppointmentService.getAppointmentTrends(req.query.ProviderID, req.query.StartDateTime, req.query.EndDateTime);
        res.status(200).send(data);
    } catch (err) {
        next(err);
    }
}

async function getAllServiceProviders(req, res, next) {
    try {
        const data = await AppointmentService.getAllServiceProviders();
        res.status(200).send(data);
    } catch (err) {
        next(err);
    }
}

module.exports = {
    createAppointment, deleteAppointment, bookAppointment, cancelAppointment, modifyAppointmentTime, getAppointmentSlotsForProvider, getAllAvailableAppointments, getAppointmentsByUser, getAllSystemAppointments, modifyAppointment, getAppointmentTrends, getAllServiceProviders
};
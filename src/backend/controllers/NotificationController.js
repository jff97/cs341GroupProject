//Author: Creed Zagrzebski
//Date: November 6 2023
//Class & Methods Explained: This class is used to do functions relating to notifications using NotificationService
const NotificationService = require('../services/NotificationService');

// For testing purposes. This endpoint should never be used in production.
async function createNotification(req, res, next) {
    try {
        await NotificationService.createNotification(req.body);
        res.status(201).send("Notification successfully created!");
    } catch (err) {
        next(err);
    }
}

async function getAllNotificationsForUser(req, res, next) {
    try {
        const data = await NotificationService.getAllNotificationsForUser(req.UserID);
        res.status(200).send(data);
    } catch (err) {
        next(err);
    }
}

async function deleteNotification(req, res, next) {
    try {
        await NotificationService.deleteNotification(req.params.NotificationID);
        res.status(200).send("Notification successfully deleted!");
    } catch (err) {
        next(err);
    }
}

async function toggleNotificationRead(req, res, next) {
    try {
        await NotificationService.toggleNotificationRead(req.params.NotificationID);
        res.status(200).send("Notification successfully toggled!");
    } catch (err) {
        next(err);
    }
}

module.exports = {
    createNotification, getAllNotificationsForUser, deleteNotification, toggleNotificationRead
};
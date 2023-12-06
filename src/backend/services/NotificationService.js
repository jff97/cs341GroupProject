//Author: Creed Zagrzebski
//Date Created: November 6 2023            
//Class & Methods Explained: This class is used to provide an interface for notification service 
const DataAccess = require('../dataAccessLayer/DataAccess');

const logger = require('../logging')

const SALT_ROUNDS = 10;

class NotificationService {
    async createNotification({UserID, NotificationTitle, NotificationMessage, NotificationDate, NotificationType}) {
        if(!UserID || !NotificationTitle || !NotificationMessage || !NotificationDate || !NotificationType) {
            const err = new Error('Missing required fields for notification creation!');
            err.code = 400;
            throw err;
        }

        const notification = await DataAccess.createNotification(NotificationTitle, NotificationMessage, NotificationDate, NotificationType, UserID);
    }

    async getAllNotificationsForUser(UserID) {
        if(!UserID) {
            const err = new Error('Missing required fields for notification retrieval!');
            err.code = 400;
            throw err;
        }

        const notifications = await DataAccess.getAllNotificationsForUser(UserID);
        return notifications;
    }

    async deleteNotification(NotificationID) {
        if(!NotificationID) {
            const err = new Error('Missing required fields for notification deletion!');
            err.code = 400;
            throw err;
        }

        const notification = await DataAccess.deleteNotification(NotificationID);
    }

    async toggleNotificationRead(NotificationID) {
        if(!NotificationID) {
            const err = new Error('Missing required fields for notification read toggle!');
            err.code = 400;
            throw err;
        }

        const notification = await DataAccess.toggleNotificationRead(NotificationID);
    }
}

const notificationServiceInstance = Object.freeze(new NotificationService());
module.exports = notificationServiceInstance;
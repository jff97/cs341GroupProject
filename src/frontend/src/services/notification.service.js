import api from './api';

const NOTIFICATION_ENDPOINT = '/api/notification/';

const notificationService = {
    getAllNotification: async () => {
        return await api
            .get(NOTIFICATION_ENDPOINT + "user")
            .then((response) => {
                return response.data;
            });
    },

    deleteNotification: async (NotificationID) => {
        return await api
            .delete(NOTIFICATION_ENDPOINT + NotificationID)
            .then((response) => {
                return response.data;
            });
    },

    toggleNotificationRead: async (NotificationID) => {
        return await api
            .put(NOTIFICATION_ENDPOINT + "toggle/" + NotificationID)
            .then((response) => {
                return response.data;
            });
    }
}

export default notificationService;
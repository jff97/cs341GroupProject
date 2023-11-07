// Routes for appointment
const express = require('express');
const { createNotification, getAllNotificationsForUser, deleteNotification, toggleNotificationRead } = require('../controllers/NotificationController');
const { enforceAuthentication } = require('../middlewares/auth_middleware');

const router = express.Router();

router.post('/create', createNotification);
router.get('/user', enforceAuthentication, getAllNotificationsForUser);
router.delete('/:NotificationID', deleteNotification);
router.put('/toggle/:NotificationID', toggleNotificationRead);

module.exports = router;
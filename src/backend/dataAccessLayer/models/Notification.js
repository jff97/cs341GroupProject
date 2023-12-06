//Author: Creed Zagrzebski
//Date Created: November 6 2023         
//Class & Methods Explained: This class is used to define a sequelize model for Notification 
const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('Notification', {
        NotificationID: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        NotificationTitle: {
            type: DataTypes.STRING(50),
            allowNull: false
        },
        NotificationMessage: {
            type: DataTypes.STRING(500),
            allowNull: false
        },
        NotificationDate: {
            type: DataTypes.DATE,
            allowNull: false
        },
        NotificationType: {
            type: DataTypes.ENUM('Appointment', 'Service', 'System'),
            allowNull: false
        },
        NotificationRead: {
            type: DataTypes.BOOLEAN,
            allowNull: false
        }
    })
}
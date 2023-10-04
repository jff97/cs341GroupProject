const { DataTypes } = require('sequelize');
const sequelize = require('../sequelize_index.js');

const AppointmentSlot = sequelize.define('AppointmentSlot', {
    AppointmentID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    StartDateTime: {
        type: DataTypes.DATE,
        allowNull: false
    },
    EndDateTime: {
        type: DataTypes.DATE,
        allowNull: false
    },
})

module.exports = AppointmentSlot
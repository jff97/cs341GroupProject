const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('AppointmentSlot', {
        AppointmentID: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        AppointmentTitle: {
            type: DataTypes.STRING(50),
            allowNull: false
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
}
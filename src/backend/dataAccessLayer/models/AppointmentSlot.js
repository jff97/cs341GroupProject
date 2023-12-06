//Author: Creed Zagrzebski
//Date Created: October 4 2023 
//Dates Modified: October 5, 8            
//Class & Methods Explained: This class is used to define a sequelize model for an AppointmentSlot 
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
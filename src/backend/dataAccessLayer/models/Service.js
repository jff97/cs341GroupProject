//Author: Creed Zagrzebski
//Date Created: October 4 2023 
//Dates Modified: October 5           
//Class & Methods Explained: This class is used to define a sequelize model for Service
const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('Service', {
        ServiceID: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        ServiceTitle: {
            type: DataTypes.STRING(50),
            allowNull: false
        },
        ServiceInfo: {
            type: DataTypes.STRING(500),
            allowNull: false
        },
        Category: {
            type: DataTypes.ENUM('Beauty', 'Fitness', 'Health'),
            allowNull: false
        }
    })
}



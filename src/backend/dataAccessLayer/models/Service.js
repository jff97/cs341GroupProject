const { DataTypes } = require('sequelize');
const sequelize = require('../sequelize_index.js');

const Service = sequelize.define('Service', {
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

module.exports = Service;

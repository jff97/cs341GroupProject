const { DataTypes } = require('sequelize');
const sequelize = require('../sequelize_index.js');

const Role = sequelize.define('Role', {
    RoleID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    RoleName: {
        type: DataTypes.STRING(50),
        allowNull: false
    },
})

module.exports = Role;
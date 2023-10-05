const { DataTypes } = require('sequelize');
const sequelize = require('..');

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
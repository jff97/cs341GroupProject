const { DataTypes } = require('sequelize');

module.exports = (sequelize) => 
    sequelize.define('Role', {
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
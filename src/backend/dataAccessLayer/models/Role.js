//Author: Creed Zagrzebski
//Date Created: October 4 2023 
//Dates Modified: October 5           
//Class & Methods Explained: This class is used to define a sequelize model for Role
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
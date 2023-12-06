//Author: Creed Zagrzebski
//Date Created: October 4 2023 
//Dates Modified: October 5, Novemeber 5           
//Class & Methods Explained: This class is used to define a sequelize model for Users
const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('User', {
        UserID: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        FirstName: {
            type: DataTypes.STRING(50),
            allowNull: false
        },
        LastName: {
            type: DataTypes.STRING(50),
            allowNull: false
        },
        FullName: {
            type: DataTypes.VIRTUAL,
            get() {
                return `${this.FirstName} ${this.LastName}`;
            },
            set() {
                throw new Error('Do not try to set the `FullName` value!');
            }
        },
        UserName: {
            type: DataTypes.STRING(50),
            allowNull: false,
            unique: 'UserName'
        },
        HashedPassword: {
            type: DataTypes.STRING(255),
            allowNull: false
        },
        Birthdate: {
            type: DataTypes.DATEONLY,
            allowNull: false
        },
        Active: {
            type: DataTypes.BOOLEAN,
            allowNull: false
        },
    })
}

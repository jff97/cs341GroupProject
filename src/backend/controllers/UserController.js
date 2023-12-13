//Author: Creed Zagrzebski
//Date: October 4 2023
//Class & Methods Explained: This class is used to control functions realting to user management using a service called UserService
const UserService = require('../services/UserService');

//create a user
async function createUser(req, res, next) {
    try {
        await UserService.createUser(req.body);
        res.status(201).send("User successfully created!");
    } catch (err) {
        next(err);
    }
}

//delete a user
async function deleteUser(req, res, next) {
    try {
        await UserService.deleteUser(req.query);
        res.status(200).send("User successfully deleted!");
    } catch (err) {
        next(err);
    }
}

module.exports = {
    createUser, deleteUser
};
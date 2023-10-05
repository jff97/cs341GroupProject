const UserService = require('../services/UserService');

async function createUser(req, res, next) {
    try {
        await UserService.createUser(req.body);
        res.status(201).send("User successfully created!");
    } catch (err) {
        next(err);
    }
}

module.exports = {
    createUser
};
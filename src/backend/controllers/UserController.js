const UserService = require('../services/UserService');

async function createUser(req, res, next) {
    try {
        await UserService.createUser(req.body);
        res.status(201).send("User successfully created!");
    } catch (err) {
        next(err);
    }
}

async function deleteUser(req, res, next) {
    try {
        await UserService.deleteUser(req.query);
        res.status(200).send("User successfully deleted!");
    } catch (err) {
        next(err);
    }
}
async function getAllNormalUsers(req, res, next) {
    try {
        const users = await UserService.getAllNormalUsers();
        res.status(200).send(users);
    } catch (err) {
        next(err);
    }

}

async function getAllServiceProvidersWithService(req, res, next) {
    try {
        const users = await UserService.getAllServiceProvidersWithService();
        res.status(200).send(users);
    } catch (err) {
        next(err);
    }
}

async function disableUser(req, res, next) {
    try {
        await UserService.disableUser(req.query);
        res.status(200).send("User successfully disabled!");
    } catch (err) {
        next(err);
    }
}

async function enableUser(req, res, next) {
    try {
        await UserService.enableUser(req.query);
        res.status(200).send("User successfully enabled!");
    } catch (err) {
        next(err);
    }
}

module.exports = {
    createUser, deleteUser, getAllNormalUsers, getAllServiceProvidersWithService, disableUser, enableUser
};
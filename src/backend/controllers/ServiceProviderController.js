const ProvidedServiceService = require('../services/ProviderService');

async function createProvidedService(req, res, next) {
    try {
        await ProvidedServiceService.createProvidedService(req.body);
        res.status(201).send("User successfully created!");
    } catch (err) {
        next(err);
    }
}

module.exports = {
    createProvidedService
};
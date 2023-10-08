const ProvidedServiceService = require('../services/ProviderService');

async function createProvidedService(req, res, next) {
    try {
        await ProvidedServiceService.createProvidedService(req.body);
        res.status(201).send("Service successfully created!");
    } catch (err) {
        next(err);
    }
}

async function deleteProvidedService(req, res, next) {
    try {
        await ProvidedServiceService.deleteProvidedService(req.query);
        res.status(200).send("Service successfully deleted!");
    } catch (err) {
        next(err);
    }
}

async function modifyProvidedService(req, res, next) {
    try {
        await ProvidedServiceService.modifyProvidedService(req.body);
        res.status(201).send("Service successfully modified!");
    } catch (err) {
        next(err);
    }
}

module.exports = {
    createProvidedService, deleteProvidedService, modifyProvidedService
};
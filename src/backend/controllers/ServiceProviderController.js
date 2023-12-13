//Author: John Fox, Alex Cappel, Peter Xiong
//Date Created: October 5 2023 
//Dates Modified: October 5, 7
//Class & Methods Explained: This class is used to handle various operations relating to provided services
const ProvidedServiceService = require('../services/ProviderService');

//create service provided 
async function createProvidedService(req, res, next) {
    try {
        await ProvidedServiceService.createProvidedService(req.body);
        res.status(201).send("Service successfully created!");
    } catch (err) {
        next(err);
    }
}

//delete service provided 
async function deleteProvidedService(req, res, next) {
    try {
        await ProvidedServiceService.deleteProvidedService(req.query);
        res.status(200).send("Service successfully deleted!");
    } catch (err) {
        next(err);
    }
}

//modify service provided 
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
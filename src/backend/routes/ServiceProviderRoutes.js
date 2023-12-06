//Author: John Fox, Alex Cappel
//Date Created: October 5 2023            
//Date Modified: October 7
//Class & Methods Explained: This class is used to define routes for service provider related operations
const express = require('express');
const { createProvidedService, deleteProvidedService, modifyProvidedService } = require('../controllers/ServiceProviderController');

const router = express.Router();

router.post('/create', createProvidedService);
router.delete('/delete', deleteProvidedService);
router.post('/modify', modifyProvidedService)

module.exports = router;
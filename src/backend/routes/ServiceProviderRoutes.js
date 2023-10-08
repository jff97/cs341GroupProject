const express = require('express');
const { createProvidedService, deleteProvidedService, modifyProvidedService } = require('../controllers/ServiceProviderController');

const router = express.Router();

router.post('/create', createProvidedService);
router.delete('/delete', deleteProvidedService);
router.post('/modify', modifyProvidedService)

module.exports = router;
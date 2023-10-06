const express = require('express');
const { createProvidedService } = require('../controllers/ServiceProviderController');

const router = express.Router();

router.post('/create', createProvidedService);

module.exports = router;
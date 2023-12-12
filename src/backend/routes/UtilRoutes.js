const express = require('express');
const { getPlatform } = require('../controllers/UtilController');
const router = express.Router();

router.get('/platform', getPlatform);

module.exports = router;
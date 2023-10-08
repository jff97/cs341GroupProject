const express = require('express');
const { login, logout, checkIfAuthenticated, renewAccessToken } = require('../controllers/AuthController');
const { enforceAuthentication } = require('../middlewares');

const router = express.Router();

router.post('/login', login);
router.post('/logout', logout);
router.get('/check', enforceAuthentication, checkIfAuthenticated);
router.post("/refresh_token", renewAccessToken);

module.exports = router;
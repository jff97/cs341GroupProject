//Author: Creed Zagrzebski
//Date Created: October 6 2023            
//Class & Methods Explained: This class is used to define routes for authentication related operations
const express = require('express');
const { login, logout, checkIfAuthenticated, renewAccessToken } = require('../controllers/AuthController');
const { enforceAuthentication } = require('../middlewares');

const router = express.Router();

router.post('/login', login);
router.post('/logout', logout);
router.get('/check', enforceAuthentication, checkIfAuthenticated);
router.post("/refresh_token", renewAccessToken);

module.exports = router;
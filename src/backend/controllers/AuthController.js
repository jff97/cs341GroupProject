//Author: Creed Zagrzebski
//Date: October 6 2023
//Class & Methods Explained: This class is used to contorl functions relatin to authtication using AuthService
const AuthService = require('../services/AuthService');

//login/user authentication and token generation
async function login(req, res, next) {
    try {
        const tokens = await AuthService.login(req.body);
        // Send Refresh Token as cookie to mitigate XSS attacks
        res.cookie("rft", tokens.RefreshToken, { httpOnly: true, path: "/api/auth" });
        // Send access token in response body (short lived token)
        res.status(200).json({
            "AccessToken": tokens.AccessToken
        });
    } catch (err) {
        next(err);
    }
}

//user logout
async function logout(req, res, next) {
    try {
        await AuthService.logout(req.cookies.rft);
        res.status(200).send("User successfully logged out!");
    } catch (err) {
        next(err);
    }
}

//checks if user is authenticated
async function checkIfAuthenticated(req, res, next) {
    try {
        res.status(200).send("User is authenticated!");
    } catch (err) {
        next(err);
    }
}

//renew access token using refresh
async function renewAccessToken(req, res, next) {
    try {
        const newAccessToken = await AuthService.getNewToken(req.cookies.rft);
        res.status(200).json({
            "AccessToken": newAccessToken
        });
    } catch (err) {
        next(err);
    }
}

module.exports = {
    login, logout, checkIfAuthenticated, renewAccessToken
}
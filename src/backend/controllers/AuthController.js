const AuthService = require('../services/AuthService');

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

async function logout(req, res, next) {
    try {
        await AuthService.logout(req.cookies.rft);
        res.status(204).send("User successfully logged out!");
    } catch (err) {
        next(err);
    }
}

module.exports = {
    login, logout
}
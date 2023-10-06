const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
const DataAccess = require('../dataAccessLayer/DataAccess');

class AuthService {
    constructor() {
        this.refreshTokens = [];
    }

    // Login a user by validating credentials and generating tokens
    async login({UserName, Password}) {
        // Check to see if the user exists
        const user = await DataAccess.getUserByUserName(UserName.toLowerCase().trim());
        if(!user) {
            const err = new Error('Invalid username or password!');
            err.code = 401;
            throw err;
        }

        // Compare password to stored hash
        const isValidPassword = bcrypt.compareSync(Password, user.HashedPassword);

        if(!isValidPassword) {
            const err = new Error('Invalid username or password!');
            err.code = 401;
            throw err;
        }

        // Generate tokens
        const tokens = await this.generateTokens(user);

        // Add refresh token to list (allows for logout)
        this.refreshTokens[tokens.RefreshToken] = user; 
        return tokens;
    }

    // Logout a user by invalidating tokens
    async logout(refreshToken) {
        delete this.refreshTokens[refreshToken];
    }

    // Generate a pair of tokens (access and refresh) for a user
    async generateTokens(User) {
        return {
            "AccessToken": this.generateAccessToken(User),
            "RefreshToken": this.generateRefreshToken(User),
        }
    }

    async getNewToken(refreshToken) {
        if (refreshToken == null || this.refreshTokens[refreshToken] == null) {
            const err = new Error('Invalid Token');
            err.code = 401;
            throw err;
        };
      
        const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);

        if (decoded == null) {
            const err = new Error('Invalid Token');
            err.code = 401;
            throw err;
        };

        return this.generateAccessToken(decoded);
      }

    generateAccessToken({UserID, RoleID, FullName, UserName}) {
        return jwt.sign({UserID, RoleID, FullName, UserName}, process.env.ACCESS_TOKEN_SECRET, {expiresIn: '15m'});
    }

    generateRefreshToken({UserID, RoleID, FullName, UserName}) {
        return jwt.sign({UserID, RoleID, FullName, UserName}, process.env.REFRESH_TOKEN_SECRET, {expiresIn: '7d'});
    }

}

const authServiceInstance = Object.freeze(new AuthService());
module.exports = authServiceInstance;
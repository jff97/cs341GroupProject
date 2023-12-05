//Author: Creed Zagrzebski
//Date: October 6 2023
//Class & Methods Explained: This class is used to define tokenManager object  which is responsible for managing access and refresh tokens for authentication
const logger = require('../logging').logger;
const crypto = require("crypto");

const tokenManager = {
  setup: () => {
    //Check if token secrets were provided
    if (!process.env.ACCESS_TOKEN_SECRET) {
      logger.error("Please Provide a Access Token Secret. See documentation for details.");
      process.exit();
    } else if (!process.env.REFRESH_TOKEN_SECRET) {
      logger.error("Please Provide a Refresh Token Secret. See documentation for details.");
      process.exit();
    }
  },
  generateTokens: () => {
    const accessToken = crypto.randomBytes(64).toString("hex");
    const refreshToken = crypto.randomBytes(64).toString("hex");

    console.log(`ACCESS_TOKEN_SECRET=${accessToken}`);
    console.log(`REFRESH_TOKEN_SECRET=${refreshToken}`);
  },
};

if (require.main === module) {
  tokenManager.generateTokens();
}

module.exports = {
  tokenManager,
};
//Author: Creed Zagrzebski
//Date Created: October 6 2023            
//Class & Methods Explained: This class is used to allow other parts of the program to use middleware for enforcing authentication in routes
const { enforceAuthentication } = require("./auth_middleware");

module.exports = {
    enforceAuthentication,
};
 const jwt = require("jsonwebtoken");
 
 /**
 * Middleware for Access Token Validation
 */
async function enforceAuthentication(req, res, next) {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    // TODO: WARNING!!!! THIS IS REALLY BAD FOR SECURITY. THIS MUST BE REMOVED BEFORE PRODUCTION
    // BUT THIS MAKES IT EASIER FOR DEVELOPMENT PURPOSES
    if (process.env.NODE_ENV === "development") {
        // Allow access to API for development purposes
        next();
    }

    //check if token exists in request
    if (token == null) return res.status(401).send("Invalid Token");

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) return res.status(401).send("Invalid Token");
        req.UserID = user.UserID;
        next();
    });
}

module.exports = {
    enforceAuthentication
}
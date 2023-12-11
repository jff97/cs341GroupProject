 const jwt = require("jsonwebtoken");
 
 /**
 * Middleware for Access Token Validation
 */
async function enforceAuthentication(req, res, next) {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

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
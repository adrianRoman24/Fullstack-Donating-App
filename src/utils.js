const config = require("../config/config.json");

const { expressjwt: jwt } = require('express-jwt');
const jwks = require('jwks-rsa');
const { auth } = require("express-openid-connect");

const log = (toLog, type="LOG") => {
    let string = null;
    if (typeof(toLog) === "object") {
        string = JSON.stringify(toLog);
    } else {
        string = toLog;
    }
    console.log(`[${new Date().toISOString()}] [${type}] ${string}`);
}

const jwtCheck = jwt({
    secret: jwks.expressJwtSecret({
        cache: config.JWKS_CACHE,
        rateLimit: config.JWKS_RATE_LIMIT,
        jwksRequestsPerMinute: config.JWKS_REQUESTS_PER_MINUTE,
        jwksUri: config.JWKS_URI,
  }),
  audience: config.BASE_URL,
  issuer: config.ISSUER_BASE_URL,
  algorithms: config.ALGORITHMS,
});

const authMiddleware = auth({
    authRequired: true,
    auth0Logout: true,
    secret: config.SECRET,
    baseURL: config.BASE_URL,
    clientID: config.CLIENT_ID,
    issuerBaseURL: config.ISSUER_BASE_URL,
    clientSecret: config.CLIENT_SECRET,
    authorizationParams: {
        response_type: "code",
        audience: config.BASE_URL,
        scope: "openid profile email"
    }
});

module.exports.log = log;
module.exports.jwtCheck = jwtCheck;
module.exports.authMiddleware = authMiddleware;

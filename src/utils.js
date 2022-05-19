const config = require("../config/config.json");

const { expressjwt: jwt } = require('express-jwt');
const jwks = require('jwks-rsa');

exports.log = (toLog, type="LOG") => {
    let string = null;
    if (typeof(toLog) === "object") {
        string = JSON.stringify(toLog);
    } else {
        string = toLog;
    }
    console.log(`[${new Date().toISOString()}] [${type}] ${string}`);
}

exports.jwtCheck = jwt({
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

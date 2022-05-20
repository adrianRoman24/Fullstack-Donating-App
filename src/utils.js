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
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        jwksUri: 'https://dev-sqqag002.us.auth0.com/.well-known/jwks.json'
      }),
      audience: 'http://localhost:3001/',
      issuer: 'https://dev-sqqag002.us.auth0.com/',
      algorithms: [ 'RS256' ]
});

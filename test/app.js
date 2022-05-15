const express = require("express");
const app = express();
const { expressjwt: jwt } = require('express-jwt');
var jwks = require('jwks-rsa');

var jwtCheck = jwt({
    secret: jwks.expressJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        jwksUri: 'https://dev-sqqag002.us.auth0.com/.well-known/jwks.json'
  }),
  audience: 'http://localhost:5000',
  issuer: 'https://dev-sqqag002.us.auth0.com/',
  algorithms: ['RS256']
});

app.get("/public", (req, res) => {
    res.json({
        type: "public",
    })
});

app.get("/private", jwtCheck, (req, res) => {
    res.json({
        type: "private",
    })
});

app.listen(5000, () => {
    console.log("Listening on port 5000");
})
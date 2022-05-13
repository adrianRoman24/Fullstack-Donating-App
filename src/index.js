const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const { auth, requiresAuth } = require("express-openid-connect");
const { expressjwt: jwt } = require('express-jwt');
const jwks = require('jwks-rsa');
const axios = require("axios");

const config = require("../config/config.json");

function log(toLog, type="LOG") {
    let string = null;
    if (typeof(toLog) === "object") {
        string = JSON.stringify(toLog);
    } else {
        string = toLog;
    }
    console.log(`[${new Date().toISOString()}] [${type}] ${string.toString()}`);
}

log(config)

var jwtCheck = jwt({
    secret: jwks.expressJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        jwksUri: 'https://dev-sqqag002.us.auth0.com/.well-known/jwks.json'
  }),
  audience: config.BASE_URL,
  issuer: config.ISSUER_BASE_URL,
  algorithms: ['RS256']
});

async function main() {
    // auth router attaches /login, /logout, and /callback routes to the baseURL
    app.use(auth({
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
    }));
    app.use(bodyParser.json());
    
    // req.isAuthenticated is provided from the auth router
    app.get('/', (req, res) => {
        res.send({
            isAuthenticated: req.oidc.isAuthenticated(),
            user: req.oidc.user,
        });
    });

    app.get("/secure", requiresAuth(), async (req, res) => {
        let data = {};
        try {
            const { token_type, access_token } = req.oidc.accessToken;
            const apiResponse = await axios.get("http://localhost:3000/private", {
                headers: {
                    authorization: `${token_type} ${access_token}`,
                },
            });
            data = apiResponse.data;
        } catch (error) {
            console.log(error)
        }

        res.send({
            secured: "yes",
            data,
        });
    });

    app.get("/public", (req, res) => {
        res.send({
            type: "public",
        });
    });

    app.get("/private", jwtCheck, (req, res) => {
        res.send({
            type: "private",
        });
    });

    const port = config.PORT || 3000;
    app.listen(port, () => {
        log(`Listening on port ${port}`);
    });
}

main();

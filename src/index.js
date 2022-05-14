const { log, jwtCheck, authMiddleware } = require("./utils");
const { database } = require("./database");

const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const { requiresAuth } = require("express-openid-connect");
const axios = require("axios");

const config = require("../config/config.json");
log(config)

async function main() {
    // initialize database object ---------------------------------------------
    await database.initAsync();

    // use middlewares ---------------------------------------
    // auth router attaches /login, /logout, and /callback routes to the baseURL
    app.use(authMiddleware);
    app.use(bodyParser.json());
    
    // define routes ----------------------------------------------------
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

    // listen on port 3000
    app.listen(config.SERVER_PORT, () => {
        log(`Listening on port ${config.SERVER_PORT}`);
    });
}

main();

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
    // app.use(authMiddleware);
    app.use(bodyParser.json());
    
    // define routes ----------------------------------------------------
    // req.isAuthenticated is provided from the auth router
    app.get('/', (req, res) => {
        res.send({
            homepage: "This is homepage",
            isAuthenticated: req.oidc.isAuthenticated(),
            user: req.oidc.user,
        });
    });

    app.post("/register", async (req, res) => {
        if (!"accountType" in req.body) {
            res.status(400);
            res.send({
                error: "accountType not found"
            });
            return;
        }
        if (req.body.accountType === "refugee") {
            const result = await database.createRefugee(req);
            res.send(result);
        } else if (req.body.accountType === "donor") {
            const result = await database.createDonor(req);
            res.send(result);
        } else {
            res.status(400);
            res.send({
                error: "Wrong accountType. Accepted: refugee | donor",
            });
        }
    });

    app.get("/viewProfile", async (req, res) => {
        log(`View profile: ${JSON.stringify(req.query)}`);
        if (!"email" in req.query || !"accountType" in req.query) {
            res.status(400);
            res.send({
                error: "email or accountType not found in query params",
            });
            return;
        }
        if (req.query.accountType === "refugee") {
            const result = await database.findRefugee(req);
            res.send(result);
        } else if (req.query.accountType === "donor") {
            const result = await database.findDonor(req);
            res.send(result);
        }
    });

    app.get("/viewOffers", async (req, res) => {
        log(`View offers: ${JSON.stringify(req.query)}`);
        if (!"offset" in req.query) {
            res.status(400);
            res.send({
                error: "offset not found in query params",
            });
            return;
        }
        const result = await database.getOffers(req);
        res.send(result);
    });

    app.get("/viewHistory", async (req, res) => {
        log(`Get History: ${JSON.stringify(req.query)}`);
        if (!"email" in req.query || !"accountType" in req.query) {
            res.status(400);
            res.send({
                error: "email or accountType not found in query params",
            });
            return;
        }
        const result = await database.getHistory(req);
        res.send(result);
    });

    app.get("/myRequests", async (req, res) => {
        log(`My Requests: ${JSON.stringify(req.query)}`);
        if (!"email" in req.query) {
            req.status(400);
            res.send({
                error: "email not found in query params",
            });
            return;
        }
        const result = await database.getRequests(req);
        res.send(result);
    });

    app.get("/pendingRequests", async (req, res) => {
        log(`Pending Requests: ${JSON.stringify(req.query)}`);
        if (!"donorEmail" in req.query) {
            req.status(400);
            res.send({
                error: "donorEmail not found in query params",
            });
            return;
        }
        const result = await database.pendingRequests(req);
        res.send(result);
    });

    app.post("/makeRequest", async (req, res) => {
        log(`Make Request: ${JSON.stringify(req.query)}`);
        if (!"offerId" in req.body || !"refugeeEmail" in req.body || !"description" in req.body
            || !"count" in req.body || !"date" in req.body || !"donorEmail" in req.body) {
            req.status(400);
            res.send({
                error: "Wrong body. Body must contain: offerId, refugeeEmail, donorEmail, description, count, date",
            });
            return;
        }
        const result = await database.makeRequest(req);
        res.send(result);
    });

    app.post("/publishOffer", async (req, res) => {
        log(`Publish Offer: ${JSON.stringify(req.body)}`);
        if (!"location" in req.body || !"donorEmail" in req.body || !"type" in req.body
            || !"description" in req.body || !"capacity" in req.body) {
            req.status(400);
            res.send({
                error: "Wrong body. Body must contain: location, donorEmail, type, description, capacity",
            });
        }
        const result = await database.publishOffer(req);
        res.send(result);
    });

    app.get("/myOffers", async (req, res) => {
        log(`My Offers: ${JSON.stringify(req.query)}`);
        if (!"donorEmail" in req.query) {
            req.status(400);
            res.send({
                error: "donorEmail not found in query params",
            });
        }
        const result = await database.myOffers(req);
        res.send(result);
    });

    app.get("/secure", requiresAuth(), async (req, res) => {
        let data = {};
        try {
            const { token_type, access_token } = req.oidc.accessToken;
            console.log(access_token)
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

module.exports = (app) => {
    const request = require("../controller/request.controller");
    const { log } = require("../src/utils");
    const { jwtCheck } = require("../src/utils");

    const router = require("express").Router();

    router.get("/view", async (req, res) => {
        log(`View request: ${JSON.stringify(req.query)}`);
        if (!"email" in req.query) {
            req.status(400);
            res.send({
                error: "email not found in query params",
            });
            return;
        }
        const result = await request.getByRefugee(req);
        res.send(result);
    });

    router.get("/viewPending", async (req, res) => {
        log(`View pending requests: ${JSON.stringify(req.query)}`);
        if (!"donorEmail" in req.query) {
            req.status(400);
            res.send({
                error: "donorEmail not found in query params",
            });
            return;
        }
        const result = await request.getPendingByDonor(req);
        res.send(result);
    });

    router.post("/create", async (req, res) => {
        log(`Create request: ${JSON.stringify(req.query)}`);
        if (!"offerId" in req.body || !"refugeeEmail" in req.body || !"description" in req.body
            || !"count" in req.body || !"date" in req.body || !"donorEmail" in req.body) {
            req.status(400);
            res.send({
                error: "Wrong body. Body must contain: offerId, refugeeEmail, donorEmail, description, count, date",
            });
            return;
        }
        const result = await request.create(req);
        res.send(result);
    });

    router.get("/update", async (req, res) => {
        log(`Update request: ${JSON.stringify(req.body)}`);
        if (!"requestId" in req.query || !"accept" in req.query) {
            res.status(400);
            res.send({
                error: "requestId or accept not found in body",
            });
        }
        const result = await request.update(req);
        res.send(result);
    });

    app.use("/api/request", router);
};

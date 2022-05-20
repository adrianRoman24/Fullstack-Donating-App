module.exports = async (app) => {
    const request = require("../controller/request.controller");
    const { log, publishRabbitAlert, initRabbit, jwtCheck } = require("../src/utils");

    const channel = await initRabbit();
    
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
        log(`Create request: ${JSON.stringify(req.body)}`);
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
        if ("result" in result) {
            // request was generated successfully
            // publish alert on rabbitmq queue to notify donor
            await publishRabbitAlert(channel, {
                email: result.result.request.donorEmail,
                subject: "New pending request from refugee",
                body: `${result.result.request.description}\n\nRefugee: ${result.result.request.refugeeEmail}`,
            });
            log("Published rabbitmq alert on queue");
        }
    });

    router.put("/update", async (req, res) => {
        log(`Update request: ${JSON.stringify(req.body)}`);
        if (!"requestId" in req.body || !"accept" in req.body) {
            res.status(400);
            res.send({
                error: "requestId or accept not found in body",
            });
        }
        const result = await request.update(req);
        res.send(result);
        if ("result" in result) {
            // request was updated by donor
            // // publish alert on rabbitmq queue to notify refugee
            console.log()
            publishRabbitAlert(channel, {
                email: result.result.request.refugeeEmail,
                subject: `Request  ${result.result.request.status} by donor`,
                body: `Request ${result.result.request.id} was ${result.result.request.status} by donor ${result.result.request.donorEmail}`,
            });
        }
    });

    app.use("/api/request", router);
};

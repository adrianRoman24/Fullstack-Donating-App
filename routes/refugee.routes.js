module.exports = (app) => {
    const refugee = require("../controller/refugee.controller");
    const { log } = require("../src/utils");
    const { jwtCheck } = require("../src/utils");

    const router = require("express").Router();

    router.post("/register", async (req, res) => {
        log(`Register refugee: ${JSON.stringify(req.body)}`);
        const result = await refugee.create(req);
        res.send(result);
    });

    router.get("/profile", async (req, res) => {
        log(`Profile refugee: ${JSON.stringify(req.query)}`);
        if (!"email" in req.query) {
            res.status(400);
            res.send({
                error: "email not found in query params",
            });
            return;
        }
        const result = await refugee.getByEmail(req);
        res.send(result);
    });

    app.use("/api/refugee", router);
};

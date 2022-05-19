module.exports = (app) => {
    const donor = require("../controller/donor.controller");
    const { log } = require("../src/utils");
    const { jwtCheck } = require("../src/utils");

    const router = require("express").Router();

    router.post("/register", async (req, res) => {
        log(`Register donor: ${JSON.stringify(req.body)}`);
        const registered = await donor.create(req);
        res.send(registered);
    });

    router.get("/profile", async (req, res) => {
        log(`Profile donor: ${JSON.stringify(req.query)}`);
        if (!"email" in req.query) {
            res.status(400);
            res.send({
                error: "email not found in query params",
            });
            return;
        }
        const profile = await donor.getByEmail(req);
        res.send(profile);
    });

    app.use("/api/donor", router);
};

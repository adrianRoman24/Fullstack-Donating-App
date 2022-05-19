const donorRoutes = require("./donor.routes");
const refugeeRoutes = require("./refugee.routes");
const offerRoutes = require("./offer.routes");
const requestRoutes = require("./request.routes");
const interactionRoutes = require("./interaction.routes");
const viewRoutes = require("./views.routes");

module.exports = (app) => {
    donorRoutes(app);
    refugeeRoutes(app);
    offerRoutes(app);
    requestRoutes(app);
    interactionRoutes(app);
    viewRoutes(app);
};

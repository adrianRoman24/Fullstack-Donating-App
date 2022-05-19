const db = require("../models");
const Request = db.request;
const Offer = db.offer;
const Interaction = db.interaction;
const { log } = require("../src/utils");

// get all interactions
exports.get = async (req) => {
    try {
        let found = null;
        if (req.query.accountType === "donor") {
            found = await Interaction.findAll({
                where: {
                    donorEmail: req.query.email,
                }
            });
        } else if (req.query.accountType === "refugee") {
            found = await Interaction.findAll({
                where: {
                    refugeeEmail: req.query.email,
                }
            });
        } else {
            return {
                error: "Wrong account type",
            };
        }
        let ps = [];
        for (let i = 0; i < found.length; i += 1) {
            ps.push((async () => {
                const foundOffer = await Offer.findOne({
                    where: {
                        id: found[i].offerId,
                    }
                });
                found[i].offer = foundOffer;
            })());
            ps.push((async () => {
                const foundRequest = await Request.findOne({
                    where: {
                        id: found[i].requestId,
                    }
                });
                found[i].request = foundRequest;
            })());
        }
        await Promise.allSettled(ps);
        return {
            result: {
                history: found,
            },
        }
    } catch (error) {
        log(`Could not get History: ${error}`, "ERROR");
        return {
            error,
        };
    }
}

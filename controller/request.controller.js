const db = require("../models");
const Request = db.request;
const Offer = db.offer;
const Interaction = db.interaction;
const { log } = require("../src/utils");

// get all requests made by a refugee
exports.getByRefugee = async (req) => {
    try {
        const found = await Request.findAll({
            where: {
                refugeeEmail: req.query.email,
            },
        });
        return {
            result: {
                requests: found,
            }
        }
    } catch (error) {
        log(`Could not find requests: ${error}`, "ERROR");
        return {
            error,
        };
    }
}

// create new request
exports.create = async(req) => {
    try {
        const created = await Request.create({
            offerId: req.body.offerId,
            donorEmail: req.body.donorEmail,
            refugeeEmail: req.body.refugeeEmail,
            description: req.body.description,
            count: req.body.count,
            date: new Date(req.body.date),
            status: "pending",
        });
        return {
            result: {
                request: created,
            },
        }
    } catch (error) {
        log(`Could not make request: ${error}`, "ERROR");
        return {
            error,
        };
    }
}

// get pending requests of a donor
exports.getPendingByDonor = async (req) => {
    try {
        const found = await Request.findAll({
            where: {
                donorEmail: req.query.donorEmail,
                status: "pending",
            }
        });
        return {
            result: {
                requests: found,
            }
        }
    } catch (error) {
        log(`Could not find pending requests: ${error}`, "ERROR");
        return {
            error
        };
    }
}

// update request by donor
exports.update = async (req) => {
    try {
         // find request 
         log(req.query.accept);
        const request = await Request.findOne({
            where: {
                id: req.query.requestId,
            },
        });log(req.query.accept);
        if (req.query.accept === "true") {  log('ekefant3');
            // find offer
            const offer = await Offer.findOne({
                where: {
                    id: request.offerId,
                }
            })
            // update offer
            const updatedOffer = await offer.update({
                capacity: offer.capacity - request.count,
            });
            // create interaction
            const interaction = await Interaction.create({
                refugeeEmail: request.refugeeEmail,
                donorEmail: request.donorEmail,
                offerId: request.offerId,
                requestId: req.query.requestId,
            });
            // update request status
            const updatedRequest = await request.update({
                status: "accepted",
            });
            return {
                result: {
                    request: updatedRequest,
                    offer: updatedOffer,
                    interaction,
                },
            }
        } else {
            // update request
            const updated = await request.update({
                status: "rejected",
            });
            return {
                request: updated,
            }
        }
    } catch (error) {
        log(`Could not update request: ${error}`, "ERROR");
        return {
            error,
        };
    }
}

const db = require("../models");
const Offer = db.offer;
const { log } = require("../src/utils");
const dbConfig = require("../config/config-db.json");

// get all offers of a certain donor
exports.getByEmail = async (req) => {
    try {
        const found = await Offer.findAll({
            where: {
                donorEmail: req.query.donorEmail,
            }
        });
        return {
            result: {
                offers: found,
            }
        }
    } catch (error) {
        log(`Could not get my offers: ${error}`, "ERROR");
        return {
            error,
        };
    }
}

// get all offers
exports.getAll = async (req) => {
    try {
        const found = await Offer.findAll({
            offset: parseInt(req.query.offset),
            limit: dbConfig.QUERY_LIMIT,
        });
        log(`Offers retrieving result: ${found}`);
        return {
            result: {
                offers: found,
                offset: parseInt(req.query.offset) + found.length,
            },
        }
    } catch (error) {
        log(`Could not find offers: ${error}`, "ERROR");
        return {
            error,
        };
    }
}

// add new offer
exports.add = async (req) => {
    try {
        const created = await Offer.create({
            location: req.body.location,
            donorEmail: req.body.donorEmail,
            type: req.body.type,
            description: req.body.description,
            capacity: req.body.capacity,
            date: new Date(req.body.date),
        });
        return {
            result: {
                offer: created,             
            }
        }
    } catch (error) {
        log(`Could not publish offer: ${error}`, "ERROR");
        return {
            error,
        };
    }
}

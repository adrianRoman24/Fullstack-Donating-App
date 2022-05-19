const db = require("../models");
const Donor = db.donor;
const { log } = require("../src/utils");

// create donor
exports.create = async (req) => {
    try {
        const donor = {
            name: req.body.name,
            email: req.body.email,
            sex: req.body.sex,
            rating: 0,
            personalInformation: req.body.personalInformation,
            votes: 0,
            phone: req.body.phone,
            address: req.body.address,
        }
        const created = await Donor.create(donor);
        log(`Donor creation result: ${created}`);
        return {
            result: {
                donor: created,
            },
        };
    } catch (error) {
        log(`Could not create donor: ${error}`, "ERROR");
        return {
            error,
        };
    }
}

exports.getByEmail = async (req) => {
    try {
        const found = await Donor.findOne({
            where: {
                email: req.query.email,
            }
        });
        log(`Donor searching result: ${found}`);
        return {
            result: {
                donor: found,
            },
        }
    } catch (error) {
        log(`Could not find donor: ${error}`, "ERROR");
        return {
            error
        };
    }
}

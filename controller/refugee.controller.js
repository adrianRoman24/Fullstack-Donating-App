const db = require("../models");
const Refugee = db.refugee;
const { log } = require("../src/utils");

// create refugee
exports.create = async(req) => {
    try {
        const refugee = {
            name: req.body.name,
            email: req.body.email,
            sex: req.body.sex,
            rating: 0,
            personalInformation: req.body.personalInformation,
            lookingFor: req.body.lookingFor,
            votes: 0,
            phone: req.body.phone,
            address: req.body.address,
        }
        const created = await Refugee.create(refugee);
        log(`Refugee creation result: ${created}`);
        return {
            result: {
                refugee: created,
            },
        };
    } catch (error) {
        log(`Could not create refugee: ${error}`, "ERROR");
        return {
            error
        };
    }
}

// find refugee by email
exports.getByEmail = async (req) => {
    try {
        const found = await Refugee.findOne({
            where: {
                email: req.query.email,
            }
        });
        log(`Refugee searching result: ${found}`);
        return {
            result: {
                refugee: found,
            },
        }
    } catch (error) {
        log(`Could not find refugee: ${error}`, "ERROR");
        return {
            error,
        };
    }
}

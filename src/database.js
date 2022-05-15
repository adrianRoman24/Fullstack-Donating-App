const dbConfig = require("../config/config-db.json");
const { log } = require("../src/utils");
const { Sequelize } = require("sequelize");
const DonorModel = require("../models/donor");
const RefugeeModel = require("../models/refugee");
const RequestModel = require("../models/request");
const OfferModel = require("../models/offer");
const InteractionModel = require("../models/interaction");

class Database {
    constructor() {
        this.sequelize = new Sequelize({
            host: dbConfig.HOST,
            port: dbConfig.PORT,
            username: dbConfig.USER,
            password: dbConfig.PASSWORD,
            database: dbConfig.DATABASE,
            dialect: dbConfig.DIALECT,
            pool: {
                max: dbConfig.POOL_MAX,
                min: dbConfig.POOL_MIN,
                acquire: dbConfig.POOL_ACQUIRE,
                idle: dbConfig.POOL_IDLE,
            },
        });
        this.Donor = DonorModel(this.sequelize, Sequelize);
        this.Refugee = RefugeeModel(this.sequelize, Sequelize);
        this.Request = RequestModel(this.sequelize, Sequelize);
        this.Offer = OfferModel(this.sequelize, Sequelize);
        this.Interaction = InteractionModel(this.sequelize, Sequelize);
    }

    initAsync = async () => {
        try {
            await this.sequelize.authenticate();
            log('Connection has been established successfully.');
            await this.sequelize.sync();
            log('Sync has been successfull.');
        } catch (error) {
            log(`Unable to connect to the database: ${error}`, "ERROR");
        }
    }

    // refugee helpers
    createRefugee = async(req) => {
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
            const created = await this.Refugee.create(refugee);
            log(`Refugee creation result: ${created}`);
            return {
                result: "success",
                refugee: created,
            };
        } catch (error) {
            log(`Could not create refugee: ${error}`, "ERROR");
            return {
                error
            };
        }
    }

    findRefugee = async(req) => {
        try {
            const found = await this.Refugee.findOne({
                where: {
                    email: req.query.email,
                }
            });
            log(`Refugee searching result: ${found}`);
            return {
                result: "success",
                refugee: found,
            }
        } catch (error) {
            log(`Could not find refugee: ${error}`, "ERROR");
            return {
                error
            };
        }
    }

    // donor helpers
    createDonor = async(req) => {
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
            const created = await this.Donor.create(donor);
            log(`Donor creation result: ${created}`);
            return {
                result: "success",
                donor: created,
            };
        } catch (error) {
            log(`Could not create donor: ${error}`, "ERROR");
            return {
                error
            };
        }
    }

    findDonor = async(req) => {
        try {
            const found = await this.Donor.findOne({
                where: {
                    email: req.query.email,
                }
            });
            log(`Donor searching result: ${found}`);
            return {
                result: "success",
                donor: found,
            }
        } catch (error) {
            log(`Could not find donor: ${error}`, "ERROR");
            return {
                error
            };
        }
    }

    // offers helpers
    getOffers = async (req) => {
        try {
            const found = await this.Offer.findAll({
                offset: parseInt(req.query.offset),
                limit: dbConfig.QUERY_LIMIT,
            });
            log(`Offers retrieving result: ${found}`);
            return {
                result: "success",
                offers: found,
                offset: parseInt(req.query.offset) + dbConfig.QUERY_LIMIT,
            }
        } catch (error) {
            log(`Could not find offers: ${error}`, "ERROR");
            return {
                error
            };
        }
    }

    publishOffer = async (req) => {
        try {
            const created = await this.Offer.create({
                location: req.body.location,
                donorEmail: req.body.donorEmail,
                type: req.body.type,
                description: req.body.description,
                capacity: req.body.capacity,
                date: new Date(req.body.date),
            });
            return {
                result: "success",
                offer: created,
            }
        } catch (error) {
            log(`Could not publish offer: ${error}`, "ERROR");
            return {
                error
            };
        }
    }

    myOffers = async (req) => {
        try {
            const found = await this.Offer.findAll({
                where: {
                    donorEmail: req.query.donorEmail,
                }
            });
            return {
                result: "success",
                offers: found,
            }
        } catch (error) {
            log(`Could not get my offers: ${error}`, "ERROR");
            return {
                error,
            };
        }
    }

    // requests helpers
    getRequests = async (req) => {
        try {
            const found = await this.Request.findAll({
                where: {
                    refugeeEmail: req.query.email,
                },
            });
            return {
                result: "success",
                requests: found,
            }
        } catch (error) {
            log(`Could not find requests: ${error}`, "ERROR");
            return {
                error
            };
        }
    }

    pendingRequests = async (req) => {
        try {
            const found = await this.Request.findAll({
                where: {
                    donorEmail: req.query.donorEmail,
                    status: "pending",
                }
            });
            return {
                result: "success",
                requests: found,
            }
        } catch (error) {
            log(`Could not find pending requests: ${error}`, "ERROR");
            return {
                error
            };
        }
    }

    makeRequest = async(req) => {
        try {
            const created = await this.Request.create({
                offerId: req.body.offerId,
                donorEmail: req.body.donorEmail,
                refugeeEmail: req.body.refugeeEmail,
                description: req.body.description,
                count: req.body.count,
                date: new Date(req.body.date),
                status: "pending",
            });
            return {
                result: "success",
                request: created,
            }
        } catch (error) {
            log(`Could not make request: ${error}`, "ERROR");
            return {
                error,
            };
        }
    }

    // interactions helpers
    getHistory = async (req) => {
        try {
            let found = null;
            if (req.query.accountType === "donor") {
                found = await this.Interaction.findAll({
                    where: {
                        donorEmail: req.query.email,
                    }
                });
            } else if (req.query.accountType === "refugee") {
                found = await this.Interaction.findAll({
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
                    const foundOffer = await this.Offer.findOne({
                        where: {
                            id: found[i].offerId,
                        }
                    });
                    found[i].offer = foundOffer;
                })());
                ps.push((async () => {
                    const foundRequest = await this.Request.findOne({
                        where: {
                            id: found[i].requestId,
                        }
                    });
                    found[i].request = foundRequest;
                })());
            }
            await Promise.allSettled(ps);
            return {
                result: "success",
                history: found,
            }
        } catch (error) {
            log(`Could not get History: ${error}`, "ERROR");
            return {
                error,
            };
        }
    }


    acceptRejectRequest = async (req) => {
        try {
            if (req.body.accept === true) {
                // find request
                const request = await this.Request.findOne({
                    where: {
                        id: req.body.requestId,
                    },
                });
                // update offer
                const offer = await this.Offer.findOne({
                    where: {
                        id: request.offerId,
                    },
                })
                const offerUpdated = await offer.update({
                    capacity: offer.capacity - request.count,
                });
                // create interaction
                const interactionCreated = await this.Interaction.create({
                    refugeeEmail: request.refugeeEmail,
                    donorEmail: request.donorEmail,
                    offerId: request.offerId,
                    requestId: req.body.requestId,
                });
                // update request status
                const updated = await request.update({
                    status: "accepted",
                });
                return {
                    result: "success",
                    request: updated,
                    interaction: interactionCreated,
                }
            } else {
                const updated = await this.Request.update({
                    status: "rejected",
                    where: {
                        id: req.body.requestId,
                    }
                });
                return {
                    result: "success",
                    request: updated,
                }
            }
        } catch (error) {
            log(`Could not accept request: ${error}`, "ERROR");
            return {
                error,
            };
        }
    }
}

module.exports.database = new Database();

async function test() {
    const database = new Database();
    await database.initAsync();
}

test();

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
    }

    initAsync = async () => {
        try {
            await this.sequelize.authenticate();
            log('Connection has been established successfully.');
            await this.sequelize.sync();
            log('Sync has been successfull.');
        } catch (error) {
            console.error('Unable to connect to the database:', error);
        }
    }
}

module.exports.database = new Database();

async function main() {
    await new Database().initAsync();
}

main();

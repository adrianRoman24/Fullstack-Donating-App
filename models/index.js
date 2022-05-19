const dbConfig = require("../config/config-db.json");
const Sequelize = require("sequelize");
const { log } = require("../src/utils");

const sequelize = new Sequelize({
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

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.initAsync = async () => {
    try {
        await sequelize.authenticate();
        log('Connection has been established successfully.');
        await sequelize.sync();
        log('Sync has been successfull.');
    } catch (error) {
        log(`Unable to connect to the database: ${error}`, "ERROR");
        throw(error)
    }
}

db.donor = require("./donor")(sequelize, Sequelize);
db.refugee = require("./refugee")(sequelize, Sequelize);
db.request = require("./request")(sequelize, Sequelize);
db.offer = require("./offer")(sequelize, Sequelize);
db.interaction = require("./interaction")(sequelize, Sequelize);

module.exports = db;

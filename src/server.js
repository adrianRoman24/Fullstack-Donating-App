// const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
// const helmet = require("helmet");
// var http = require('http');


const { log } = require("./utils");
const config = require("../config/config.json");
log(config)

const app = express();
const db = require("../models");

async function main() {
    // init database
    await db.initAsync();
    log("Database initialized")

    // add middlewares
    app.engine('html', require('ejs').renderFile);
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: false }));
    
    // initialize routes
    require("../routes")(app);
    log("Routes initialized");

    // listen on port 3000
    app.listen(config.SERVER_PORT, () => {
        log(`Listening on port ${config.SERVER_PORT}`);
    });
}

main();

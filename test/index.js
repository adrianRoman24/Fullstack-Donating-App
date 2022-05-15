const express = require("express");
const app = express();
const { auth, requiresAuth } = require("express-openid-connect");
const { expressjwt: jwt } = require('express-jwt');
const jwks = require('jwks-rsa');
const axios = require("axios");

const indexRouter = require("./routes/index");

const config = {
    authRequired: false,
    auth0Logout: true,
    secret: '3uMXOclwi9bkjS2XR_RqSdDQaJxOyk4Z2LbJdDlGZ6ApgCNCSwGNrym_u7itbicc',
    baseURL: 'http://localhost:3000',
    clientID: 'LvFx3v6D2W36ucidLMlRtwiHVkjWFxRW',
    issuerBaseURL: 'https://dev-sqqag002.us.auth0.com',
    clientSecret: "3uMXOclwi9bkjS2XR_RqSdDQaJxOyk4Z2LbJdDlGZ6ApgCNCSwGNrym_u7itbicc",
    authorizationParams: {
        response_type: "code",
        audience: "http://localhost:5000",
        scope: "openid profile email"
    }
  };

async function main() {
    app.set("views", "views");
    app.set("view engine", "ejs");
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use(express.static("public"));
    app.use(auth(config));

    app.get('/', indexRouter);
    app.get("/secured", indexRouter);

    const port = 3000;
    app.listen(port, () => {
        console.log(`Listening on port ${port}`);
    });
}

main();

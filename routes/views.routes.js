module.exports = (app) => {
    const router = require("express").Router();
    const path = require("path");
    const express = require("express");
    const { log } = require("../src/utils");
    const { auth, requiresAuth } = require("express-openid-connect");

    const config = {
        authRequired: false,
        auth0Logout: true,
        secret: 'dwrc34c2cr24t32tgf35y34y545by3bu356by3by3b3533454v53tt242tc4c3g4g3',
        baseURL: 'http://localhost:3000/',
        clientID: 'goxwRqT3y1zl78JTmTwaQPz3EIicW0zk',
        issuerBaseURL: 'https://dev-sqqag002.us.auth0.com',
        clientSecret: "cisQytqhy6_fcsoaR4ZqqnkzTjc46ItAbG8gT8bJrLBwVDEM6p7IKBrHv_h_H8sX",
        authorizationParams: {
            response_type: "code",
            audience: "http://localhost:3001",
            scope: "openid profile email"
        },
    };

    // const authMiddleware = auth(config);
    // router.use(authMiddleware)

    router.use(express.static(path.join(__dirname, '/../public')));

    // added as login callback
    router.get("/homepage", (_, res) => {
        res.sendFile(path.join(__dirname, "../views/homepage.html"));
    });

    // added as login callback
    router.get("/donor/homepage", (_, res) => {
        res.sendFile(path.join(__dirname, "../views/donor_homepage.html"));
    });

    router.get("/donor/profile", (_, res) => {
        res.sendFile(path.join(__dirname, "../views/donor_profile.html"));
    });

    // added as login callback
    router.get("/refugee/homepage", (req, res) => {
        console.log(req.query)
        res.sendFile(path.join(__dirname, "../views/refugee_homepage.html"));
    });

    router.get("/refugee/profile", (_, res) => {
        res.sendFile(path.join(__dirname, "../views/refugee_profile.html"));
    });

    router.get("/login", (_, res) => {
        res.sendFile(path.join(__dirname, "../views/login.html"));
    });

    // added as login callback
    router.get("/signup", (_, res) => {
        res.sendFile(path.join(__dirname, "../views/signup.html"));
    });

    router.get("/offer/create", (_, res) => {
        res.sendFile(path.join(__dirname, "../views/makeOffer.html"));
    });

    router.get("/offer/view", (_, res) => {
        res.sendFile(path.join(__dirname, "../views/view_offers.html"));
    });

    router.get("/offer/my_offers", (_, res) => {
        res.sendFile(path.join(__dirname, "../views/my_offers.html"));
    });

    router.get("/request/view", (_, res) => {
        res.sendFile(path.join(__dirname, "../views/view_requests.html"));
    });
    
    router.get("/request/create", (_, res) => {
        res.sendFile(path.join(__dirname, "../views/makeRequest.html"));
    });
    
    router.get("/request/my_requests", (_, res) => {
        res.sendFile(path.join(__dirname, "../views/my_requests.html"));
    });
    
    router.get("/history/offer_view", (_, res) => {
        res.sendFile(path.join(__dirname, "../views/view_offers_history.html"));
    });
    
    router.get("/history/request_view", (_, res) => {
        res.sendFile(path.join(__dirname, "../views/view_requests_history.html"));
    });

    app.use("/views", router);
};

module.exports = (app) => {
    const router = require("express").Router();
    const path = require("path");
    const express = require("express");
    const { log, isUserRegistered } = require("../src/utils");

    router.use(express.static(path.join(__dirname, '/../public')));

    // dummy page used to check if user is registered after login
    router.get("/dummy", (_, res) => {
        res.sendFile(path.join(__dirname, "../views/dummy.html"));
    });

    // added as login callback
    router.get("/homepage", async (req, res) => {
        log(`Homepage: ${req.query}`);
        if ("email" in req.query) {
            // check if email is registered
            const isRegistered = await isUserRegistered(req);
            if (isRegistered === true) {
                log("User not registered");
                res.sendFile(path.join(__dirname, "../views/homepage.html"));
            } else {
                log("User registered")
                res.sendFile(path.join(__dirname, "../views/signup.html"));
            }
        } else {
            res.sendFile(path.join(__dirname, "../views/homepage.html"));
        }
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
    
    router.get("/history", (_, res) => {
        res.sendFile(path.join(__dirname, "../views/history.html"));
    });

    app.use("/views", router);
};

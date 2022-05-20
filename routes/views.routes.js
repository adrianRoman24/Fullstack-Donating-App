module.exports = (app) => {
    const router = require("express").Router();
    const path = require("path");
    const express = require("express");

    router.use(express.static(path.join(__dirname, '/../public')));

    router.get("/homepage", (_, res) => {
        res.render(path.join(__dirname, "../views/homepage.html"));
    });

    router.get("/donor/homepage", (_, res) => {
        res.render(path.join(__dirname, "../views/donor_homepage.html"));
    });

    router.get("/donor/profile", (_, res) => {
        res.sendFile(path.join(__dirname, "../views/donor_profile.html"));
    });

    router.get("/refugee/homepage", (_, res) => {
        res.sendFile(path.join(__dirname, "../views/refugee_homepage.html"));
    });

    router.get("/refugee/profile", (_, res) => {
        res.sendFile(path.join(__dirname, "../views/refugee_profile.html"));
    });

    router.get("/login", (_, res) => {
        res.sendFile(path.join(__dirname, "../views/login.html"));
    });

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

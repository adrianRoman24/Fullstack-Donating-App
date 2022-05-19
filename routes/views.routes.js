module.exports = (app) => {
    const router = require("express").Router();
    const path = require("path");
    const express = require("express");

    router.use(express.static(path.join(__dirname, '/../public')));

    router.get("/homepage", (_, res) => {
        res.sendFile(path.join(__dirname, "../views/homepage.html"));
    });

    router.get("/donor/homepage", (_, res) => {
        res.sendFile(path.join(__dirname, "../views/donor_homepage.html"));
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

    app.use("/views", router);
};

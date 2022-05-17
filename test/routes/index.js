const express = require("express");
const router = express.Router();
const { auth, requiresAuth } = require("express-openid-connect");
const axios = require("axios");

router.get("/", (req ,res) => {
    console.log(req.oidc.isAuthenticated())
    console.log(req.body);
    res.render("index", {
        title: "Express Demo",
        isAuthenticated: req.oidc.isAuthenticated(),
        user: req.oidc.user,
    });
});

router.get("/secured", requiresAuth(), async (req ,res) => {
    console.log("Token");
    console.log(req.oidc.accessToken);
    console.log("Body");
    console.log(req.body);
    console.log("Query")
    console.log(req.query);
    let data = {};
    const { token_type, access_token } = req.oidc.accessToken;
    req.oidc.id
    console.log(req.oidc.idToken);
    try {
        const apiResponse = await axios.get("http://localhost:5000/private", {
            headers: {
                authorization: `${token_type} ${access_token}`,
            }
        });
        data = apiResponse.data;
    } catch (error) {
        console.log(error)
    }
    res.render("secured", {
        title: "Secure Page",
        isAuthenticated: req.oidc.isAuthenticated(),
        user: req.oidc.user,
        data,
        access_token,
    });
});

module.exports = router;

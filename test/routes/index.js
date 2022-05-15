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
    let data = {};
    const { token_type, access_token } = req.oidc.accessToken;
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

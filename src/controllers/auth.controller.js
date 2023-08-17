const m$auth = require("../modules/auth.module");
const response = require("../helpers/response");

const { Router } = require("express");

const authController = Router();

authController.post("/register", async (req, res) => {
    const result = await m$auth.register(req.body);

    return response.sendResponse(res, result);
});

authController.post("/login", async (req, res) => {
    const result = await m$auth.login(req.body);

    return response.sendResponse(res, result);
});

module.exports = authController;

const m$user = require("../modules/user.module");
const response = require("../helpers/response");

const authorization = require("../middlewares/authorization");

const { Router } = require("express");

const userController = Router();

userController.get("/", authorization, async (req, res) => {
    const result = await m$user.getAllDataUser();

    return response.sendResponse(res, result);
});

userController.put("/update/:id", authorization, async (req, res) => {
    const result = await m$user.updateDataUser(req.body, req.params.id);

    return response.sendResponse(res, result);
});

userController.delete("/delete/:id", authorization, async (req, res) => {
    const result = await m$user.deleteDataUser(req.params.id);

    return response.sendResponse(res, result);
});

module.exports = userController;

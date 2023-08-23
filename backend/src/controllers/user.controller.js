const m$user = require("../modules/user.module");
const response = require("../helpers/response");

const authorization = require("../middlewares/authorization");

const { Router } = require("express");

const userController = Router();

userController.get("/", async (req, res) => {
    const result = await m$user.getAllDataUser();

    return response.sendResponse(res, result);
});

userController.put("/update/:id", async (req, res) => {
    const result = await m$user.updateDataUser(req.body, req.params.id);

    return response.sendResponse(res, result);
});

userController.get("/detail/:id", async (req, res) => {
    const result = await m$user.getSpesificDataUser(req.params.id);

    return response.sendResponse(res, result);
});

userController.delete("/delete/:id", async (req, res) => {
    const result = await m$user.deleteDataUser(req.params.id);

    return response.sendResponse(res, result);
});

userController.put("/delete/inventory/:id", authorization, async (req, res) => {
    const result = await m$user.deleteInventory(req.params.id, req.body);

    return response.sendResponse(res, result);
});

module.exports = userController;

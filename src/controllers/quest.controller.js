const m$quest = require("../modules/quest.module");
const response = require("../helpers/response");
const authorization = require("../middlewares/authorization");

const { Router } = require("express");

const questController = Router();

questController.get("/:id", async (req, res) => {
    const result = await m$quest.getQuest(req.params.id);

    return response.sendResponse(res, result);
});

questController.put("/update/:id", async (req, res) => {
    const result = await m$quest.updateQuest(req.params.id, req.body);

    return response.sendResponse(res, result);
});

questController.put("/delete/:id", async (req, res) => {
    const result = await m$quest.deleteQuest(req.params.id, req.body);

    return response.sendResponse(res, result);
});

questController.get("/detail/:id", async (req, res) => {
    const result = await m$quest.getDetail(req.params.id);

    return response.sendResponse(res, result);
});

module.exports = questController;

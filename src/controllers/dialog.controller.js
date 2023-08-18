const m$dialog = require("../modules/dialog.module");
const response = require("../helpers/response");
const authorization = require("../middlewares/authorization");

const { Router } = require("express");

const dialogController = Router();

dialogController.get("/:id", authorization, async (req, res) => {
    const result = await m$dialog.getDialog(req.params.id);

    return response.sendResponse(res, result);
});

dialogController.put("/update/:id", authorization, async (req, res) => {
    const result = await m$dialog.updateDialog(req.params.id, req.body);

    return response.sendResponse(res, result);
});

dialogController.put("/delete/:id", authorization, async (req, res) => {
    const result = await m$dialog.deleteDialog(req.params.id, req.body);

    return response.sendResponse(res, result);
});

module.exports = dialogController;

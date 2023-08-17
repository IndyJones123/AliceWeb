const m$game = require("../modules/game.module");
const response = require("../helpers/response");
const upload = require("../middlewares/multer");

const authorization = require("../middlewares/authorization");

const { Router } = require("express");

const gameController = Router();

gameController.post(
    "/add",
    [authorization, upload.single("gambar")],
    async (req, res) => {
        const result = await m$game.addGame(req.body, req.file);

        return response.sendResponse(res, result);
    }
);

gameController.get("/", async (req, res) => {
    const result = await m$game.getGame();

    return response.sendResponse(res, result);
});

module.exports = gameController;

const authController = require("./src/controllers/auth.controller");
const gameController = require("./src/controllers/game.controller");
const userController = require("./src/controllers/user.controller");
const dialogController = require("./src/controllers/dialog.controller");
const questController = require("./src/controllers/quest.controller");

const _routes = [
    ["auth", authController],
    ["game", gameController],
    ["users", userController],
    ["dialog", dialogController],
    ["quest", questController],
];

const routes = (app) => {
    _routes.forEach((route) => {
        const [url, controller] = route;

        app.use(`/api/${url}`, controller);
    });
};

module.exports = routes;

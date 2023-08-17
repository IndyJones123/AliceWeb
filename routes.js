const authController = require("./src/controllers/auth.controller");
const gameController = require("./src/controllers/game.controller");

const _routes = [
    ["auth", authController],
    ["game", gameController],
];

const routes = (app) => {
    _routes.forEach((route) => {
        const [url, controller] = route;

        app.use(`/api/${url}`, controller);
    });
};

module.exports = routes;

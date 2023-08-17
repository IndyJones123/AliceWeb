const authController = require("./src/controllers/auth.controller");

const _routes = [["auth", authController]];

const routes = (app) => {
    _routes.forEach((route) => {
        const [url, controller] = route;

        app.use(`/api/${url}`, controller);
    });
};

module.exports = routes;

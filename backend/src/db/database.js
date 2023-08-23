const Firestore = require("@google-cloud/firestore");
const path = require("path");

const pathKey = path.resolve("./keyFile.json");
const idProject = process.env.PROJECT_ID || "unity-e3e5d";

const db = new Firestore({
    projectId: idProject,
    keyFilename: pathKey,
});

module.exports = db;

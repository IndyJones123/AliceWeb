const express = require("express");
const cors = require("cors");
const routes = require("./routes");

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", async (req, res) => {
    res.status(200).json({
        message: "ya, this works.",
    });
});

routes(app);

app.use("/assets", express.static(`./src/public`));
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

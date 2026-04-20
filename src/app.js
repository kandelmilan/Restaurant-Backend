const express = require("express");
const cors = require("cors");
const routes = require("./routes");
const app = express();

app.use(express.json());
app.use(cors());

// Routes
app.use("/api", routes);

app.get("/", (req, res) => {
    res.send("Backend Running...");
});

module.exports = app;
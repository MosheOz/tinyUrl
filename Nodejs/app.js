const express = require("express");
const cors = require("cors");
const DBconnect = require("./config/db");

const server = express();

// connect to DB
DBconnect();

server.use(cors());
server.use(express.json());

//routes
server.use("/api/url", require("./routes/urlShorten"));
server.use("/", require("./routes/index"));

server.get("*", (req, res) => {
    res.status(404).json("Route not found");
})

const PORT = 3000;
server.listen(PORT, () => console.log("Server running on port " + PORT));
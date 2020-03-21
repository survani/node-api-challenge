const express = require("express");

//routes
const projectRouter = require("./projects/projectRouter");


const server = express();
server.use(express.json());

server.use('/api/projects', projectRouter);

//working...
server.get("/", (req, res) => {
    res.send("welcome");
});

module.exports = server;
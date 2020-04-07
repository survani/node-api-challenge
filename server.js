const express = require("express");

//routes
const projectRouter = require("./projects/projectRouter");
const actionRouter = require("./Actions/actionRouter");


const server = express();
server.use(express.json());

server.use('/api/projects', projectRouter);
server.use('/api/actions', actionRouter);

//working...
server.get("/", (req, res) => {
    res.send("welcome");
});

module.exports = server;
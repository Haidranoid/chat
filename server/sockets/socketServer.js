const {socketServer} = require('../server');

socketServer.on("connection", client => {
    console.log("Client connected");
});

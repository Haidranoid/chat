const {socketServer} = require('../server');
const Users = require('../classes/Users');

const users = new Users();

socketServer.on("connection", client => {
    console.log("Client connected");

    client.on('disconnect', () => {
        console.log("Client disconnected")
    });
});

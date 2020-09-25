const {socketServer} = require('../server');
const Users = require('../classes/Users');

const users = new Users();

socketServer.on("connection", client => {
    console.log("Client connected");

    client.on('disconnect', () => {
        console.log("Client disconnected");
    });

    client.on('userLogged', (user, callback) => {
        console.log('User logged: ', user);
        users.addUser(client.id, user.name);
        callback(users.getUsers())
    })
});

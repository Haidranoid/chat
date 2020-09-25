const {socketServer} = require('../server');
const Users = require('../classes/Users');

const users = new Users();

socketServer.on("connection", client => {
    console.log("Client connected");

    client.on('disconnect', () => {
        const userRemoved = users.removeUser(client.id);
        client.broadcast.emit('inbox', {user: 'Administrator', message: `${userRemoved.name} has disconnected`})
    });

    client.on('userLogged', (user, callback) => {
        if (!user.name) return callback('There is no name user');

        users.addUser(client.id, user.name);
        callback(null, users.getUsers())
    })
});

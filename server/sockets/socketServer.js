const {socketServer} = require('../server');
const Users = require('../classes/Users');

const users = new Users();

socketServer.on("connection", client => {
    console.log("Client connected");

    client.on('disconnect', () => {
        console.log("Client disconnected");
        const userRemoved = users.removeUser(client.id);

        if (userRemoved) {
            client.broadcast.to(userRemoved.room).emit('public:message', {
                user: 'Administrator',
                message: `${userRemoved.name} has disconnected`
            })
        }
    });

    client.on('user:logged', (user, callback) => {
        if (!user.name || !user.room) return callback('There is no name user');

        client.join(user.room);

        users.addUser(client.id, user.name, user.room);

        client.broadcast.to(user.room).emit('room:message', user);
        callback(null, users.getUsersByRoom(user.room))
    });

    client.on('private:message', data => {
        const user = users.getUserById(client.id);
        if (user) {
            client.broadcast.to(data.userId).emit('private:message', {
                user: user.name,
                message: 'mensaje privado'
            })
        }
    })
});

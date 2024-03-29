class Users {

    constructor() {
        this.users = [];
    }

    addUser(id, name, room) {
        const user = {id, name, room};
        this.users.push(user);

        return this.users;
    }

    getUserById(id) {
        return this.users.filter(user => user.id === id)[0];
    }

    getUsers() {
        return this.users;
    }

    getUsersByRoom(room) {
        return this.users.filter(user => user.room === room);
    }

    removeUser(id) {
        const userRemoved = this.getUserById(id);
        this.users = this.users.filter(user => user.id !== id);
        return userRemoved;
    }

}

module.exports = Users;

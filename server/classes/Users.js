class Users {

    constructor() {
        this.users = [];
    }

    addUser(id, name, room = '') {
        const users = {id, name, room};
        this.users.push(users);

        return this.users;
    }

    getUserById(id) {
        return this.users.filter(users => users.id === id)[0];
    }

    getUsers() {
        return this.users;
    }

    getUsersByRoom(room) {
        return this.users.filter(users => users.room === room);
    }

    removeUser(id) {
        const userRemoved = this.getUserById(id);
        this.users = this.users.filter(users => users.id !== id);

        return userRemoved;
    }

}

module.exports = Users;

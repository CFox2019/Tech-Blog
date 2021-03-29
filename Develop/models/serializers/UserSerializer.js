class UserSerializer {
    constructor(user) {
        this.id = user.id;
        this.username = user.username;
        // We don't want to expose user.password!
    }
}

module.exports = UserSerializer;
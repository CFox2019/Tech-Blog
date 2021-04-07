class UserParams {
  constructor(body) {
    this.username = body.username;
    this.password = body.password;
  }
}

module.exports = UserParams;
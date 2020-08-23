module.exports = {
  isUser: function (req, res) {
    return !!req.session.isLoggedIn;
  },
  loginStatus: function (req, res) {
    let loginElm = '<a href="/auth/login">Login</a>';
    if (this.isUser(req, res)) {
      loginElm = '<a href="/auth/logout">Logout</a>';
    }

    return loginElm;
  }
}
module.exports = {
  isUser: function (req, res) {
    return !!req.session.isLoggedIn;
  },
  loginStatus: function (req, res) {
    const link = this.isUser(req, res) ? 'logout' : 'login';
    const text = link.charAt(0).toUpperCase() + link.substring(1);
    return `<a href="/auth/${link}">${text}</a>`;
  },
  dataManagerUI: function (req, res) {
    return this.isUser(req, res) ? `<a href="/data">Data Manager</a>` : '';
  }
}
const express = require('express');
const router = express.Router();
const template = require('../lib/template.js');
const auth = require('../lib/auth.js');

router.get('/', (req, res) => {
  const title = auth.isUser(req, res) ? `<h1 class='data__title'>Item List</h1>` : '';
  const list = auth.isUser(req, res) ? template.products(req.products) : '';
  const body = `
    <main role="main">
      ${title}
      ${list}
    </main>
  `;
  const header = auth.isUser(req, res) ? `
    <p class='greetings'>OOO님, 환영합니다</p>
  ` : `
    <form class='log-in' action='/auth/login_validate' method='post'>
      <h1 class='log-in__title'>Administrator Login</h1>
      <input type='text' name='user-id' placeholder='ID' />
      <input type='password' name='user-pw' placeholder='Password' />
      <input type='submit' value='Login' />
    </form>
  `;
  const page = template.HTML(title, body, header, auth.loginStatus(req, res), '');

  res.send(page);
})

module.exports = router;
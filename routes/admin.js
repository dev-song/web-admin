const express = require('express');
const router = express.Router();
const template = require('../lib/template.js');
const auth = require('../lib/auth.js');

router.get('/', (req, res) => {
  const pageTitle = 'Administrator';
  const body = auth.isUser(req, res) ? `
    <main role='main'>
      ${template.products(req.products)}
    </main>
  ` : '';
  const header = auth.isUser(req, res) ? `
    <header class='header-admin'>
      <p class='header__greetings'>OOO</p>
      <a class='header__logout' href="/auth/logout">Logout</a>
    </header>
  ` : `
    <header class='header-login'>
      <form class='log-in' action='/auth/login_validate' method='post'>
        <h1 class='log-in__title'>Administrator Login</h1>
        <input class='log-in__id' type='text' name='user-id' placeholder='ID' />
        <input class='log-in__password' type='password' name='user-pw' placeholder='Password' />
        <input class='log-in__submit' type='submit' value='Login' />
      </form>
    </header>
  `;
  const script = './scripts/script-admin.js';
  const page = template.HTML(pageTitle, body, header, script);

  res.send(page);
})

module.exports = router;
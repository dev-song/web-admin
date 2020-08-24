const express = require('express');
const router = express.Router();
const template = require('../lib/template.js');

const validAccount = {
  id: 'admin',
  password: 'password'
}

router.get('/login', (req, res) => {
  const title = 'Logging in...';
  const body = `
    <form class='log-in' action='/auth/login_process' method='post'>
      <input type='text' name='user-id' placeholder='ID' />
      <input type='password' name='user-pw' placeholder='Password' />
      <input type='submit' value='Login' />
    </form>  
  `;
  const header = `
    <a href='/'>Home</a>
  `;
  const page = template.HTML(title, body, header);

  res.send(page);
});

router.post('/login_process', (req, res) => {
  const id = req.body['user-id'];
  const pw = req.body['user-pw'];
  if (id === validAccount.id && pw === validAccount.password) {
    req.session.isLoggedIn = true;
    req.session.save(() => res.redirect('/'));
  } else {
    res.send('Invalid account data... :X');
  }
});

router.get('/logout', (req, res) => {
  req.session.destroy(err => {
    if (err) {
      console.error(err);
    }

    res.redirect('/');
  })
})

module.exports = router;
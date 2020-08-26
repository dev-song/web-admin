const express = require('express');
const router = express.Router();
const template = require('../lib/template.js');

const validAccount = {
  id: 'admin',
  password: 'password'
}

router.post('/login_validate', (req, res) => {
  const id = req.body['user-id'];
  const pw = req.body['user-pw'];
  if (id === validAccount.id && pw === validAccount.password) {
    req.session.isLoggedIn = true;
    req.session.save(() => res.redirect('/admin'));
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
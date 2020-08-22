const express = require('express');
const router = express.Router();
const template = require('../lib/template.js');

router.get('/login', (req, res) => {
  const title = 'Logging in...';
  const body = `
    <form class='log-in' action='/auth/login_process' method='post'>
      <input type='text' name='user-id' placeholder='ID' />
      <input type='password' name='user-pw' placeholder='Password' />
      <input type='submit' value='Login' />
    </form>  
  `;
  const page = template.HTML(title, body);

  res.send(page);
})

module.exports = router;
const express = require('express');
const router = express.Router();
const template = require('../lib/template.js');
const auth = require('../lib/auth.js');

router.get('/', (req, res) => {
  if (!auth.isUser(req, res)) {
    res.redirect('/');
  }

  res.send('data page');
})

module.exports = router;
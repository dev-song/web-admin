const express = require('express');
const router = express.Router();
const template = require('../lib/template.js');
const auth = require('../lib/auth.js');

router.get('/', (req, res) => {
  const title = 'Session Testing';
  const list = template.product(req.products);
  const body = `
    <main role="main">
      <h1 class="page-title">${title}</h1>
      ${auth.isUser(req, res) ? list : ''}
    </main>
  `;
  const page = template.HTML(title, body, '', auth.loginStatus(req, res), auth.dataManagerUI(req, res));

  res.send(page);
});

module.exports = router;
const express = require('express');
const router = express.Router();
const template = require('../lib/template.js');

router.get('/', (req, res) => {
  const title = 'Session Testing';
  const body = `
    <main role="main">
      <h1 class="page-title">${title}</h1>
      <section class="section-1">
        <p>This is section 1</p>
      </section>
    </main>
  `;
  const page = template.HTML(title, body);

  res.send(page);
});

module.exports = router;
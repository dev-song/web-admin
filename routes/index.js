const express = require('express');
const router = express.Router();
const template = require('../lib/template.js');

router.get('/', (req, res) => {
  const title = 'Session Testing';
  const body = `
    <h1>${title}</h1>
    <main role="main">
      <section class="section-1">
        <p>This is section 1</p>
      </section>
    </main>
  `
  const page = template.HTML(title, body);

  res.send(page);
});

module.exports = router;
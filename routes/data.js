const express = require('express');
const router = express.Router();
const template = require('../lib/template.js');
const auth = require('../lib/auth.js');

router.get('/', (req, res) => {
  const pageTitle = 'Upload Item';
  const body = auth.isUser(req, res) ? `
    <main role='main'>
      <form class='upload-item' action='/data/upload-process' method='post'>
        <h1 class='upload-item__title'>Upload Item</h1>
        <input class='upload-item__building' type='number' name='building' placeholder='동 번호' />
        <input class='upload-item__space' type='number' name='space' placeholder='평형' />
        <input class='upload-item__description' type='text' name='description' placeholder='설명' />
        <input class='upload-item__submit' type='submit' value='Upload' />
      </form>
    </main>
  ` : '';
  const header = auth.isUser(req, res) ? `
    <header class='header-data'>
      <p class='header__greetings'>OOO</p>
      <a class='header__home' href="/">Home</a>
    </header>
  ` : '';
  const page = template.HTML(pageTitle, body, header);

  res.send(page);
})

module.exports = router;
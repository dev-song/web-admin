const express = require('express');
const router = express.Router();
const template = require('../lib/template.js');
const auth = require('../lib/auth.js');
const multer = require('multer');
const upload = multer({ dest: 'data/uploads/' });

router.get('/', (req, res) => {
  const pageTitle = 'Upload Item';
  const body = auth.isUser(req, res) ? `
    <main role='main'>
      <form class='upload-item' action='/upload-data/process' method='post' enctype='multipart/form-data'>
        <h1 class='upload-item__title'>Upload Item</h1>
        <input class='upload-item__building' type='number' name='building' placeholder='동 번호' />
        <input class='upload-item__space' type='number' name='space' placeholder='평형' />
        <input class='upload-item__description' type='text' name='description' placeholder='설명' />
        <input class='upload-item__image' type='file' name='images' multiple />
        <div class='preview'>
        </div>
        <input class='upload-item__submit' type='submit' value='Upload' />
      </form>
    </main>
  ` : '';
  const header = auth.isUser(req, res) ? `
    <header class='header-data'>
      <p class='header__greetings'>OOO</p>
      <a class='header__link-home' href="/">Home</a>
    </header>
  ` : '';
  const script = './scripts/script.js';
  const page = template.HTML(pageTitle, body, header, script);

  res.send(page);
})

router.post('/process', upload.single('images'), (req, res) => {
  const { building, space, description } = req.body;
  const id = new Date().getTime();
  const cluster = Math.floor(parseInt(req.body.building) / 100).toString();

  console.log(req.file);
})

module.exports = router;
const express = require('express');
const router = express.Router();
const template = require('../lib/template.js');
const auth = require('../lib/auth.js');
const data = require('../lib/data.js');
const multer = require('multer');
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './src/uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}.${data.getFileType(file.mimetype)}`);
  }
})
const upload = multer({ storage: storage });

const DATA_PATH = './data/product-data.json';

router.get('/', (req, res) => {
  if (!auth.isUser(req, res)) {
    res.redirect('/admin');
    return;
  }

  const pageTitle = 'Upload Item';
  const body = `
    <main role='main'>
      <form class='upload-item' action='/data-manager/process' method='post' enctype='multipart/form-data' onsubmit='return formValidate()'>
        <h1 class='upload-item__title'>Upload Item</h1>
        <input class='upload-item__building' type='number' name='building' placeholder='동 번호' required />
        <input class='upload-item__space' type='number' name='space' placeholder='평형' required />
        <input class='upload-item__description' type='text' name='description' placeholder='설명' />
        <input class='upload-item__image' type='file' name='images' multiple />
        <div class='preview'>
        </div>
        <input class='upload-item__submit' type='submit' value='Upload' />
      </form>
    </main>
  `;
  const header = `
    <header class='header-data'>
      <p class='header__greetings'>OOO</p>
      <a class='header__link-home' href="/">Home</a>
    </header>
  `;
  const script = './scripts/script-data-manager.js';
  const page = template.HTML(pageTitle, body, header, script);

  res.send(page);
})

router.post('/process', upload.array('images'), (req, res) => {
  const { building, space, description } = req.body;
  const imagesInfo = req.files.map(elm => {
    return {
      name: elm.originalname,
      type: elm.mimetype,
      fileName: elm.filename
    };
  })

  const dataToUpload = {
    id: new Date().getTime(),
    info: {
      cluster: Math.floor(parseInt(req.body.building) / 100),
      building,
      space,
      description,
      imagesInfo
    }
  };

  data.saveImageData(DATA_PATH, dataToUpload);
  res.redirect('/data-manager');
})

router.get('/delete/:id', (req, res) => {
  const id = req.params.id;

  data.deleteItemData(DATA_PATH, id);
  res.redirect('/admin');
})

module.exports = router;
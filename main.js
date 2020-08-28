const express = require('express');
const app = express();
const fs = require('fs');
const session = require('express-session');
const FileStore = require('session-file-store')(session);

const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('src'));
app.use(session({
  secret: 'itmustnotbeshowntoothers!!@!!',
  resave: false,
  saveUninitialized: true,
  store: new FileStore()
}));

app.get('*', (req, res, next) => {
  fs.readFile('./data/product-data.json', 'utf-8', (err, data) => {
    req.products = data;
    next();
  })
})

const indexRouter = require('./routes/index');
const adminRouter = require('./routes/admin');
const authRouter = require('./routes/auth');
const dataRouter = require('./routes/data');

app.use('/', indexRouter);
app.use('/admin', adminRouter);
app.use('/auth', authRouter);
app.use('/upload-data', dataRouter);

app.use((req, res, next) => {
  res.status(404).send('Error 404: Unable to find the webpage :X');
})

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send(`Something's wrong... :(`);
})

app.listen(port, () => {
  console.log(`The app is listening on port ${port}`);
})
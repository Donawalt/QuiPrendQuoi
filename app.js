const express = require('express');
const app = express();
const port = 3000;
const dotenv = require('dotenv').config();

app.set('view engine', 'pug');

app.get('/', function(req, res) {
    res.render('index');
  });

app.listen(port, () => console.log(`Front app listening on port ${port}!`));
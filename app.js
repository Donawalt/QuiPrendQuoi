const express = require('express');
const app = express();
const port = 3000;
const dotenv = require('dotenv').config();

app.get('/', function(req, res) {
  res.send('Qui prend quoi ? ');
});

app.listen(port, () => console.log(`Front app listening on port ${port}!`));
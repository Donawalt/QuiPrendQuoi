const express = require("express");
const app = express();
const port = 3000;
const dotenv = require("dotenv").config();
const bodyParser = require("body-parser");
const axios = require("axios");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(express.static('pwa'));

app.set("view engine", "pug");

app.get("/", function(req, res) {
  res.render("index", { title: "Qui prend quoi ?" });
});

app.post("/party", function(req, res) {
  axios
    .post(`${process.env.API_URL}/party`, req.body)
    .then(({ data }) => res.redirect(`/party/${data._id}`))
    .catch(err => res.send(err));
});

app.get("/party/:id", function(req, res) {
  axios
  .get(`${process.env.API_URL}/party/${req.params.id}`)
    .then(({ data }) => {
      console.log(data);
      res.render("party", {
        party: data,
        title: data.name,
        id: data._id,
        url: `${process.env.FRONT_URL}:${process.env.PORT}/party/${data._id}`
      });
    })
    .catch(err => console.log(err));
});

app.post("/party/:id/items", function(req, res) {
  axios
    .post(`${process.env.API_URL}/party/${req.params.id}/items`, req.body)
    .then(({ data }) => res.redirect(`/party/${req.params.id}`))
    .catch(err => res.send(err));
});

app.post("/party/:id", function(req,res) {
  axios
    .patch(`${process.env.API_URL}/party/${req.params.id}`, req.body)
    .then(({ data }) => {
      console.log(data);
      res.redirect(`/party/${req.params.id}`);
    })
    .catch(err => res.send(err));
})


app.listen(port, () => console.log(`Front app listening on port ${port}!`));

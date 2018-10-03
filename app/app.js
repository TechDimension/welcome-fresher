//require("./config/config.js");

const express = require("express");
const hbs = require("hbs");
const _ = require("lodash");

var bodyParser = require("body-parser");
var { ObjectID } = require("mongodb");

var { mongoose } = require("./db/mongoose");

var { User } = require("./models/user");

const port = process.env.PORT || 3000;

var app = express();

hbs.registerPartials(__dirname + "/views/partials");

app.set("view engine", "hbs");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

console.log(__dirname + "/public");
app.use(express.static(__dirname + "/public"));

app.use("/", (req, res, next) => {
  console.log(req.url);
  next();
});

app.get("/", (req, res) => {
  // console.log("The current working directory is " + process.cwd());
  res.render("welcome.hbs");
});

app.post("/", async (req, res) => {
  try {
    const body = _.pick(req.body, ["email"]);
    const user = new User(body);
    await user.save();
    res.send(user);
  } catch (e) {
    res.status(400).send(e);
    console.log(e);
  }
});

app.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});

module.exports = { app };

const express = require("express");
const {
  register,
  login,
} = require("../controllers/AuthController");

const Router = express.Router();

Router.post("/register", register);
Router.post("/login", login);

Router.use("*", (req, res) => {
  res.status(404).send("Sorry, can't find that!");
});

module.exports = Router;

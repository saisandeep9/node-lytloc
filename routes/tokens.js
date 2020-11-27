const express = require("express");
const app = express();
const _ = require("lodash");
const bcrypt = require("bcrypt");

const config = require("config");
const { Token, validate } = require("../models/token");


app.post("/", async (req, res) => {
//   const { error } = validate(req.body);
//   if (error) return res.status(400).send(error.details[0].message);


 
  token = await new Token(_.pick(req.body, ["token"]));

 

  await token.save();
  res.send(token);


});

module.exports = app;
const express = require("express");
const app = express();
const Joi = require("joi");
const _ = require("lodash");
const bcrypt = require("bcrypt");


const { User } = require("../models/user");


// posting users
app.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let user = await User.findOne({ userid: req.body.userid });
  if (!user) return res.status(400).send("Invalid User Id or password");

  //Hash the password
  const ispasswordValid = await bcrypt.compare(
    req.body.password,
    user.password
  );

  if (!ispasswordValid)
    return res.status(400).send("Invalid password. please try again");

  const token = user.generateAuthToken();
  // res.send(token);
  // res.send(true);
  res.header("x-auth-token", token).send(_.pick(user, ["name"]));
});

function validate(req) {
  const schema = {
    userid: Joi.string().required(),
    password: Joi.string().min(5).max(350).required(),
  };
  return Joi.validate(req, schema);
}

module.exports = app;
const express = require("express");
const app = express();
const _ = require("lodash");
const bcrypt = require("bcrypt");

const config = require("config");
const { User, validate } = require("../models/user");


app.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let user = await User.findOne({ userid: req.body.userid });
  if (user) return res.send("user already exist");
  user = await new User(_.pick(req.body, ["name", "userid"]));

  //Hash the password

  const salt = await bcrypt.genSalt(config.get("salt_to_password"));
  user.password = await bcrypt.hash(req.body.password, salt);
  await user.save();
  res.send(user);

  // const token = user.generateAuthToken();
  // res.header("x-auth-token", token).send(_.pick(user, ["name", "userid"]));

});

module.exports = app;
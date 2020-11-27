const express = require("express");
const app = express();
const _ = require("lodash");
const bcrypt = require("bcrypt");

const jwt = require("jsonwebtoken");

const config = require("config");
const { Token, validate } = require("../models/token");


app.post("/", async (req, res) => {

 let token =await new Token
//  token = await new Token(_.pick(req.body, ["token"]));
 token.expire_time =new Date().setMinutes(new Date().getMinutes()+5)
token.token = jwt.sign(
    { _id: this._id, token: this.expire_time },
    config.get("jwtPrivateKey")
  );
  await token.save();
  res.send(token);


});



app.get("/" , async(req,res)=>{

  token= await Token.find()
  res.send(token)
})

module.exports = app;
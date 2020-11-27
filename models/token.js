const mongoose = require("mongoose");
const config = require("config");
const jwt = require("jsonwebtoken");
const Joi = require("joi");

const tokenSchema = new mongoose.Schema({

 token: {
    type: String,
    minlength: 5,
    maxlength: 50,
    // required: true,
    unique: true,
    trim: true,
  },
 expire_time: {
     type: Date,
    default:new Date().setMinutes(new Date().getMinutes()+5)

  
  },

});



const Token = mongoose.model("Tokens", tokenSchema);
function validateUser(token) {
  const schema = {
    token: Joi.string().min(5).max(250).required(),
    expire_time: Joi.string().min(5).max(350).required(),
 


  };
  return Joi.validate(token, schema);
}

module.exports.Token = Token;
module.exports.validate = validateUser;